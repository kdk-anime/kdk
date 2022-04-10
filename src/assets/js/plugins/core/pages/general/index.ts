import animePoster from './components/animePoster';
import { ContainerHandler } from '../../../../objects/containers';
import { Packet } from '../../../../packet';
import Core from '../../index';
import { default as ShikimoriTS } from '../../../shikimori/src';
import { default as KodikTS } from '../../../kodik';
import { ResponseError } from '@fleisar/kodik.ts/dist/schemas/shared';
import { SearchResponse } from '@fleisar/kodik.ts/dist/schemas/search';
import requestError from './components/requestError';

export default class General implements Partial<ContainerHandler> {
	private parent: Core;

	constructor(parent: Core) {
		this.parent = parent;
	}

	lazyLoad: any;

	forTheFirstTime = true;

	loadInProgress = false;

	backplateImage: Record<string, string>;

	resultsOffset = 0;

	open() {
		if (this.forTheFirstTime) {
			this.forTheFirstTime = false;
			this.firstOpen();
		}
		return true;
	}

	async firstOpen(autoloadTrigger: number = 200) {
		await this.loadTitles(10, true);
		document.querySelector<HTMLElement>('.page.core-general>.backplate');

		const root = document.querySelector<HTMLElement>('.page.core-general');
		root.querySelector<HTMLElement>('.backplate')
			.style.setProperty('background', `linear-gradient(#fff0, #ffff), url('//shikimori.one${this.backplateImage.original}')`);
		root.addEventListener('scroll', () => {
			const scrolledContent = root.clientHeight + root.scrollTop;
			if (root.scrollHeight - scrolledContent <= autoloadTrigger && !this.loadInProgress) {
				this.loadTitles();
			}
		});
	}

	async loadTitles(count: number = 10, backplate = false) {
		this.loadInProgress = true;
		const { Kodik, Shikimori } = Packet.store;
		const parent = document.querySelector('div.page.core-general>div.general-container');
		const shikimori = new Shikimori() as ShikimoriTS;
		const kodik = new Kodik('07e3119af111900bf95bd7c9554430a4', window.fetch.bind(window)) as KodikTS;
		const page = Math.floor(this.resultsOffset / count) + 1;
		await shikimori.getAnimeList({ limit: count, order: 'popularity', status: 'ongoing', page }).then(async (response) => {
			if (!response) {
				return;
			}
			if (backplate) {
				await shikimori.getAnime(response[0].id, '/screenshots').then((res) => {
					this.backplateImage = res[res.length - 1];
				}, (reason) => {
					parent.appendChild(requestError(`Shikimori:request:failure (${reason})`));
				});
			}
			let done = 0;
			const close = () => {
				this.resultsOffset += count;
				this.lazyLoad.update();
				this.loadInProgress = false;
			};
			let countDown = setTimeout(() => close(), 10e3);
			response.forEach((title) => {
				parent.appendChild(animePoster(title));
				kodik.search({ shikimori_id: title.id }).then((results) => {
					if ((results as ResponseError).error) {
						throw new Error('Unable to load list');
					}
					const posters = document.querySelectorAll<HTMLElement>(`.page.core-general .poster.shikimori-${title.id}`);
					if ((results as SearchResponse).total === 0) {
						posters.forEach((poster) => poster.classList.add('not-found'));
					} else {
						posters.forEach((poster) => poster.querySelector('img').dataset.src = `//shikimori.one${title.image.preview}`);
					}
					done += 1;
					clearTimeout(countDown);
					countDown = setTimeout(() => this.lazyLoad.update(), 10e3);
					if (done === response.length) {
						clearTimeout(countDown);
						close();
					}
				});
			});
		}, (reason) => {
			parent.appendChild(requestError(`Shikimori:request:failure (${reason})`));
		});
	}

	async setup() {
		Packet.link();
		const { PageDOM, LazyLoad, core: { utils: { importHTML } } } = Packet.store;
		this.lazyLoad = new LazyLoad();
		PageDOM.reserveContainer('core-general');
		const container = PageDOM.containers['core-general'];
		await importHTML('assets/js/plugins/core/pages/general/index.html', container.selector);
		return true;
	}
}
