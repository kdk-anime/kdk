type IPlugin<T = any> = {
	name: string,
	version?: number,
	plugin: T,
};

type IPluginLS = {
	name: string,
	version?: number,
	source: string,
};

export {
	IPlugin,
	IPluginLS,
};
