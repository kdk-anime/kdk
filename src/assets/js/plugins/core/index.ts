import { Packet } from '../../packet';
import { importHTML } from './utils/import';
import { ContainerHandler } from '../../objects/containers';
import { ObjectStore } from '../../objects/shared';
import General from './pages/general';

Packet.link();

Packet.add({ name: 'core', class: {
	utils: {
		importHTML,
	},
} });

export default class Core implements ContainerHandler {
	subHandlers: ObjectStore<Partial<ContainerHandler>> = {};

	constructor() {
		this.subHandlers.general = new General(this);
	}

	handler(root): boolean {
		switch (root) {
			case 'general':
			default:
				this.subHandlers.general.open();
		}
		return true;
	}

	async setup(): Promise<boolean> {
		await this.subHandlers.general.setup();
		Packet.store.Pages.open('core.general');
		return true;
	}

	roots = ['general'];

}

Packet.store.Pages.register('core', new Core());
