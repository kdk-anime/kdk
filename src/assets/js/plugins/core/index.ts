import Packet from '@kdk-core/packet';
import { ContainerHandler } from '@kdk-core/objects/containers';
import { ObjectStore } from '@kdk-core/objects/shared';
import General from './pages/general';
import Player from './pages/player';
import { PageDOMType } from '@kdk-core/classes/pages';

Packet.link();

const { PageDOM } = Packet.store as { PageDOM: PageDOMType };

export interface PageHandler extends ContainerHandler {
	name: string;
}

export default class Core implements ContainerHandler {
	subHandlers: ObjectStore<Partial<PageHandler>> = {};

	constructor() {
		this.subHandlers.general = new General();
		this.subHandlers.player = new Player();
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

	setup(): Promise<boolean> {
		return new Promise((res) => {
			Packet.pluginsAwait(['Kodik', 'Shikimori', 'LazyLoad'], async () => {
				await this.subHandlers.general.setup();
				await this.subHandlers.player.setup();
				PageDOM.switchTo(this.subHandlers.general.name);
				return res(true);
			});
		});
	}

	roots = ['general', 'player'];

}

Packet.store.Pages.register('core', new Core());
