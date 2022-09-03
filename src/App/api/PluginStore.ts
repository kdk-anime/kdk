import { IPlugin } from '../types/Plugins';

export default class PluginStore {

	private store: Record<string, IPlugin>;

	constructor() {
		if (typeof window['plugin-store'] !== 'object') {
			window['plugin-store'] = {};
		}
		this.store = window['plugin-store'];
	}

	create<T = any>(args: IPlugin<T>): boolean {
		if (this.store[args.name] !== undefined) {
			return false;
		}
		this.store[args.name] = {
			version: undefined,
			...args,
		};
		return true;
	}

	get<T = any>(name: string): IPlugin<T> | null {
		return this.store[name] || null;
	}

	new<T = any>(name: string, ...args): T | null {
		return new this.store[name].plugin(...args) || null;
	}

	remove(name: string): boolean {
		const exists = name in this.store;
		if (exists) {
			delete this.store[name];
		}
		return exists;
	}
}
