import { ContainerHandler } from '../../../../objects/containers';
import Core from '../../index';
import { Packet } from '../../../../packet';
import { default as KodikTS } from '@fleisar/kodik.ts';
import { ResponseError } from '@fleisar/kodik.ts/dist/schemas/shared';
import { SearchResponse } from '@fleisar/kodik.ts/dist/schemas/search';

export type PlayerType = 'kodik';

export default class Player implements Partial<ContainerHandler> {
	private parent: Core;

	constructor(parent: Core) {
		this.parent = parent;
	}

	open(root: string, data: { player: PlayerType, params: Record<string, any> }) {
		const { player, params } = { player: 'kodik', ...data };
		switch (player) {
			case 'kodik':
				setTimeout(async () => {
					let link = 'about:blank';
					if (params.link === undefined) {
						const { Kodik } = Packet.store;
						const kodik = new Kodik('07e3119af111900bf95bd7c9554430a4', window.fetch.bind(window)) as KodikTS;
						const response = await kodik.search(params);
						if ((response as ResponseError).error) {
							throw new Error((response as ResponseError).error);
						}
						link = (response as SearchResponse).results[0].link;
					}
					const iframe = document.createElement('iframe');
					iframe.allow = [
						'autoplay *',
						'fullscreen *',
					].join('; ');
					iframe.src = link;
					const { PageDOM } = Packet.store;
					const container = PageDOM.getContainer('core-player');
					const playerContainer = container.querySelector('div.player');
					playerContainer.innerHTML = '';
					playerContainer.appendChild(iframe);
				});
				break;
			default:
				throw new Error('Unknown player type');
		}
		const { PageDOM } = Packet.store;
		PageDOM.switchTo('core-player');
		return true;
	}

	close() {
		return true;
	}

	async setup() {
		Packet.link();
		const { PageDOM, core: { utils: { importHTML } } } = Packet.store;
		PageDOM.reserveContainer('core-player');
		const container = PageDOM.containers['core-player'];
		await importHTML('assets/js/plugins/core/pages/player/index.html', container.selector);
		return true;
	}
}
