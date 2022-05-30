import Packet from '@kdk-core/packet';
import { default as KodikTS } from '@fleisar/kodik.ts';
import { ResponseError } from '@fleisar/kodik.ts/dist/schemas/shared';
import { SearchResponse } from '@fleisar/kodik.ts/dist/schemas/search';
import TSXe from 'tsxe';
import { PlayerProvider } from './types';

const { Kodik } = Packet.store;

export default class KodikPlayer implements PlayerProvider {
	constructor(parent: HTMLElement, params: Record<string, any>) {
		if (!params.link) {
			const kodik = new Kodik('07e3119af111900bf95bd7c9554430a4', window.fetch.bind(window)) as KodikTS;
			kodik.search(params).then((response) => {
				if ((response as ResponseError).error) {
					throw new Error((response as ResponseError).error);
				}
				const link = (response as SearchResponse).results[0].link;
				this.attach(parent, link);
			}).catch((err) => {
				throw new Error(err);
			});
		} else this.attach(parent, params.link);
	}

	attach(element: HTMLElement, link: string) {
		element.appendChild(
			<iframe
				src={ link }
				allow={ ['autoplay *', 'fullscreen *'].join(';') }></iframe> as Node,
		);
	}

	open() { return; }

	close() { return; }
}
