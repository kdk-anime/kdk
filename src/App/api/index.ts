import PluginStore from './PluginStore';
import Header from './Header';
import Page from './Page';
import Panel from './Panel';
import Window from './Window';
import { IPlugin } from '../types/Plugins';

const store = new PluginStore();

const api: IPlugin[] = [
	{
		name: 'HeaderAPI',
		version: 0,
		plugin: Header,
	},
	{
		name: 'StoreAPI',
		version: 0,
		plugin: PluginStore,
	},
	{
		name: 'PageAPI',
		version: 0,
		plugin: Page,
	},
	{
		name: 'PanelAPI',
		version: 0,
		plugin: Panel,
	},
	{
		name: 'WindowAPI',
		version: 0,
		plugin: Window,
	},
];

api.forEach((plugin) => store.create(plugin));

(window as Record<string, any>).pluginStore = store;
