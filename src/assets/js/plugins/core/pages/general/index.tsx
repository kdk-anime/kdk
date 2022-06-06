import animePoster, { animePosterStyles } from './components/animePoster';
import Packet from '@kdk-core/packet';
import { default as ShikimoriTS } from '@kdk-core/plugins/shikimori/src';
import { default as KodikTS } from '@fleisar/kodik.ts/dist';
import { ResponseError } from '@fleisar/kodik.ts/dist/schemas/shared';
import { SearchResponse } from '@fleisar/kodik.ts/dist/schemas/search';
import requestError, { requestErrorStyles } from './components/requestError';
import TSXe from 'tsxe';
import { Style } from '@kdk-core/utils/style';
import { attachBlob } from '@kdk-core/utils/assets';
import loading from './assets/loading';
import { PagesType, PageDOMType } from '@kdk-core/classes/pages';
import { ConfigTree } from '@kdk-core/config';
import { PageHandler } from '../../';

Packet.link();
const { Pages, PageDOM, Config, Kodik, Shikimori } = Packet.store as {
	Pages: PagesType, PageDOM: PageDOMType, Config: () => ConfigTree,
	Kodik: typeof KodikTS, Shikimori: typeof ShikimoriTS
};


export default class General implements Partial<PageHandler> {
	name: string = 'core-general';

	lazyLoad: any;

	opts: { loadTrigger: number } | null = null;

	state = {
		firstTime: true,
		inProgress: false,
		offset: 0,
		pageSize: 10,
		scrollHandler: null,
	};

	styleObject: Style;

	constructor() {
		this.styleObject = new Style({
			'.page.core-general': {
				padding: '80px',
				overflow: 'auto',
				maxHeight: '100%',
				boxSizing: 'border-box',
				'.backplate': {
					backgroundSize: 'cover !important',
					backgroundPosition: 'center !important',
					width: 'calc(100% + 160px)',
					margin: '-80px',
					height: '300px',
				},
				'.general-container': {
					'-TilesRow': 5,
					display: 'grid',
					gridTemplateColumns: 'repeat(var(--tiles-row), 180px)',
					gap: '32px',
					justifyContent: 'center',
					...requestErrorStyles,
				},
				'.loading-box': {
					textAlign: 'center',
				},
				...animePosterStyles,
			},
		});
		[12e2, 1e3, 8e2, 6e2].forEach((width, index) => {
			this.styleObject.media(`(max-width: ${width}px)`, {
				'.page.core-general .general-container': {
					'-TilesRow': 4 - index,
				},
			}, true);
		});
	}

	binds: Record<string, (...any) => any> = {
		posters(event) {
			const poster = event.currentTarget;
			if (poster.classList.contains('poster--flipped')) {
				poster.classList.remove('poster--flipped');
			} else {
				poster.classList.add('poster--flipped');
			}
		},
		openPosters(event) {
			const poster = event.currentTarget;
			if (!poster.dataset.playerData) {
				throw new Error('no player data');
			}
			if (poster.classList.contains('not-found')) {
				return void 0;
			}
			const playerData = JSON.parse(poster.dataset.playerData);
			Pages.open('core.player', playerData);
		},
		async scrollHandler() {
			const container = PageDOM.getContainer(this.name);
			const scrolledContent = container.clientHeight + container.scrollTop;
			const toTheBottom = container.scrollHeight - scrolledContent;
			if (toTheBottom <= this.opts.loadTrigger && !this.state.inProgress) {
				await this.loadTitles();
			}
		},
	};

	open() {
		PageDOM.switchTo(this.name);
		if (this.state.firstTime) {
			this.state.firstTime = false;
			this.firstOpen().then();
		}
		return true;
	}

	close() { return true; }

	bind() {
		const container = PageDOM.getContainer(this.name);
		const posters = container.querySelectorAll<HTMLElement>('.poster');
		posters.forEach((poster) => {
			poster.addEventListener('click', this.binds.posters, false);
			poster.addEventListener('dblclick', this.binds.openPosters, false);
			container.addEventListener('scroll', this.binds.scrollHandler, false);
		});
	}

	unbind() {
		const container = PageDOM.getContainer(this.name);
		const posters = container.querySelectorAll<HTMLElement>('.poster');
		posters.forEach((poster) => {
			poster.removeEventListener('click', this.binds.posters, false);
			poster.removeEventListener('dblclick', this.binds.openPosters, false);
			container.removeEventListener('scroll', this.binds.scrollHandler, false);
		});
	}

	async firstOpen() {
		const container = PageDOM.getContainer(this.name);
		const height = container.clientHeight;
		const posterHeight = 254 + 32;
		const postersCount = Math.floor((height - 306) / posterHeight) * 5;
		this.state.pageSize = Math.floor(postersCount / 2);
		console.log(this.state, height, postersCount, container);
		for (let i = 0; i < postersCount; i += this.state.pageSize) {
			await this.loadTitles(!i);
		}
		const { general: { autoloadTrigger } } = Config();
		this.opts = {
			loadTrigger: autoloadTrigger,
		};
	}

	async loadTitles(backplate = false) {
		this.state.inProgress = true;
		const shikimori = new Shikimori();
		const kodik = new Kodik('07e3119af111900bf95bd7c9554430a4', window.fetch.bind(window));
		const page = Math.floor(this.state.offset / this.state.pageSize) + 1;

		const container = PageDOM.getContainer(this.name);
		const parent = container.querySelector('div.general-container');


		shikimori.getAnimeList({
			limit: this.state.pageSize,
			order: 'popularity',
			status: 'ongoing',
			page,
		}).then(async (response) => {
			if (!response) { return; }

			if (backplate) {
				shikimori.getAnime<Record<string, string>[]>(response[0].id, '/screenshots')
					.then((res) => {
						const image = res[res.length - 1];
						container.querySelector<HTMLElement>('.backplate').style
							.setProperty(
								'background',
								`linear-gradient(#fff0, #ffff), url('//shikimori.one${image.original}')`,
							);
					}, (reason) => {
						parent.appendChild(requestError(`Shikimori:request:failure (${reason})`));
					});
			}

			const close = () => {
				this.state.offset += this.state.pageSize;
				this.lazyLoad.update();
				this.unbind();
				this.bind();
				this.state.inProgress = false;
			};

			let countDown = setTimeout(() => close(), 10e3);

			let done = 0;
			response.forEach((title) => {
				parent.appendChild(animePoster(title));

				kodik.search({ shikimori_id: title.id })
					.then((results) => {
						if ((results as ResponseError).error) {
							throw new Error('Unable to load list');
						}

						const posters = document.querySelectorAll<HTMLElement>(`.page.core-general .poster.shikimori-${title.id}`);
						if ((results as SearchResponse).total === 0) {
							posters.forEach((poster) => poster.classList.add('not-found'));
						} else {
							posters.forEach((poster) => poster.querySelector('img')
								.dataset.src = `//shikimori.one${title.image.preview}`);
						}

						done += 1;
						clearTimeout(countDown);
						if (done === response.length) {
							close();
						} else {
							countDown = setTimeout(() => close(), 10e3);
						}
					});
			});
		}, (reason) => {
			parent.appendChild(requestError(`Shikimori:request:failure (${reason})`));
		});
	}

	async setup() {
		const { LazyLoad } = Packet.store;
		this.lazyLoad = new LazyLoad();
		const container = PageDOM.reserveContainer(this.name);
		container.appendChild(
			<>
				<style>{this.styleObject.styles()}</style>
				<div class="backplate"/>
				<h1>Главная</h1>
				<div class="general-container"/>
				<div class="poster--plate"/>
				<div class="loading-box">
					<img src={ attachBlob(loading, { type: 'image/svg+xml' }) } alt="loading" />
				</div>
			</> as Node,
		);
		return true;
	}
}
