import { watcher } from '@kdk-core/utils/asyncs';

export type PacketUnit = { name: string, class: any };

export default class Packet {
	static store: Record<string, any> = {
		global: {},
	};

	static add(...elements: PacketUnit[]) {
		Packet.link();
		elements.forEach((element) => {
			Packet.store[element.name] = element.class;
			if (Packet.store.global.Packet.listeners[element.name]) {
				Packet.store.global.Packet.listeners[element.name].forEach((listener) => listener());
			}
		});
	}

	static link() {
		let sharedPacket = (window as Record<string, any>).Packet;
		if (sharedPacket) {
			Packet.store = sharedPacket;
		} else {
			(window as Record<string, any>).Packet = Packet.store;
		}
	}

	static pluginLoad(...urls: string[]) {
		const results = [0, 0];
		let content: Record<string, string> = {};
		const handler = () => {
			if (results.reduce((a, v) => (a + v), 0) === urls.length) {
				if (results[1] !== 0) {
					const ignoreErrors = confirm('Resources downloaded with errors.\nContinue anyway?');
					if (!ignoreErrors) {
						throw new Error('Resources downloaded with errors');
					}
				}
				Object.entries(content).forEach(([name, file]) => {
					const script = document.createElement('script');
					script.dataset.src = name;
					script.innerHTML = file;
					document.head.appendChild(script);
				});
			}
		};
		urls.forEach((url) => {
			fetch(url).then( async (data) => {
				content[url] = await data.text();
				results[0]++;
				handler();
			}).catch((err) => {
				console.error('Error during loading resources:', err);
				results[1]++;
				handler();
			});
		});
	}

	static pluginsAwait(names: string[], callback: () => void) {
		const loaders: (() => Promise<boolean>)[] = names.map((name) => () => {
			return new Promise((res) => {
				console.groupCollapsed(`Waiting for ${name} plugin`);
				if (!Packet.store.global.Packet.listeners[name]) {
					Packet.store.global.Packet.listeners[name] = [];
				}
				console.log('Set load listener');
				Packet.store.global.Packet.listeners[name].push(() => {
					res(true);
				});
				if (Packet.store[name]) {
					console.log('Found in store');
					res(true);
				}
				console.groupEnd();
			});
		});

		watcher<boolean>(callback, ...loaders);
	}
}
