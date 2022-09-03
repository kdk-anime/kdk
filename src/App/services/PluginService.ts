import { IPluginLS } from '../types/Plugins';
import Config from '../config';

export default async function loadPlugins(strictMode: boolean = false) {
	const pluginStoreData = localStorage.getItem('plugin-store');

	let pluginStore: IPluginLS[] = [];

	if (pluginStoreData !== null) {
		try {
			pluginStore = JSON.parse(pluginStoreData);
		} catch (e) {
			throw new Error('Unable to parse plugin store from local storage');
		}
	} else {
		const res = await fetch('./plugins.json');
		const json = await res.json();
		if (json.version > Config.Service.PluginListVersion) {
			throw new Error('Unsupported plugins list');
		}
		pluginStore = json.plugins;
	}

	const store = [];
	let done = 0;
	const finish = () => {
		done += 1;

		if (done === pluginStore.length) {
			if (store.length !== done) {
				console.warn(`Some plugins aren't loaded (${done - store.length})`);
			}

			store.forEach((plugin) => {
				try {
					eval(plugin.code);
				} catch (e) {
					console.group(`Unhandled error in "${plugin.name}" (${plugin.version || '?'})`);
					console.error(e);
					console.groupEnd();
				}
			});
		}
	};

	pluginStore.forEach((plugin) => {

		fetch(plugin.source).then(async (res) => {
			store.push({
				...plugin,
				code: await res.text(),
			});
			finish();
		}, (rej) => {
			console.warn('Fail to load plugin:', rej);
			if (!strictMode) {
				finish();
			} else {
				alert(`Application cannot load plugin "${plugin.name}"`);
			}
		});
	});
}
