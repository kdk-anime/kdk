import { Packet } from '../../packet';
import { importHTML } from './utils/import';
import { ContainerHandler } from '../../objects/containers';
import { ObjectStore } from '../../objects/shared';
import General from './pages/general';
import Player from './pages/player';

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
		this.subHandlers.player = new Player(this);
	}

	handler(root, data): boolean {
		switch (root) {
			case 'player':
				this.subHandlers.player.open(root, data);
				break;
			case 'general':
			default:
				this.subHandlers.general.open(root, data);
		}
		return true;
	}

	close(root): boolean {
		switch (root) {
			case 'player':
				this.subHandlers.player.close();
				break;
			case 'general':
			default:
				this.subHandlers.general.close();
		}
		return true;
	}

	async setup(): Promise<boolean> {
		await this.subHandlers.general.setup();
		await this.subHandlers.player.setup();
		Packet.store.Pages.open('core.general');
		return true;
	}

	roots = ['general', 'player'];

}

Packet.store.Pages.register('core', new Core());
