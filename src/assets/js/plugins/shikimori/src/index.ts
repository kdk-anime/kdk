import {
	AnimeListOptions, CalendarOptions,
	CharacterSearchOptions,
	MangaListOptions,
	RanobeListOptions,
	UserOptions,
} from './types.js';
import {
	getAnimeOutput,
	getCalendarOutput,
	getCharacterOutput,
	getMangaOutput, getRanobeOutput,
	getUserOutput,
} from './sharedTypes';

export default class Shikimori {
	constructor() {
		return;
	}

	static endpoint = 'https://shikimori.one/api';

	getUser(id: number, options?: UserOptions, subPath?: string): Promise<getUserOutput> {
		if (!subPath) {
			return this.netRequest<getUserOutput>(`/users/${id}`, options);
		}
		return this.netRequest(`/users/${id}${subPath}`);
	}

	getAnime(id: number, subPath?: string): Promise<getAnimeOutput> {
		if (!subPath) {
			return this.netRequest<getAnimeOutput>(`/animes/${id}`);
		}
		return this.netRequest(`/animes/${id}${subPath}`);
	}

	getAnimeList(options?: AnimeListOptions): Promise<getAnimeOutput[]> {
		return this.netRequest<Partial<getAnimeOutput[]>>('/animes', options);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getManga({ id: number }, subPath?: string): Promise<getMangaOutput> {
		return new Promise(() => {});
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getMangaList(options?: MangaListOptions): Promise<getMangaOutput> {
		return new Promise(() => {});
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getRanobe({ id: number }, subPath?: string): Promise<getRanobeOutput> {
		return new Promise(() => {});
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getRanobeList(options?: RanobeListOptions): Promise<getRanobeOutput[]> {
		return new Promise(() => {});
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getCharacter({ id: number }): Promise<getCharacterOutput> {
		return new Promise(() => {});
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	searchCharacter(options?: CharacterSearchOptions): Promise<getCalendarOutput> {
		return new Promise(() => {});
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getCalendar(options?: CalendarOptions): Promise<getCalendarOutput> {
		return new Promise(() => {});
	}

	async netRequest<T = any>(path: string, args: { [key: string]: any } = {}) {
		const params = new URLSearchParams(args);
		return new Promise<T>((resolve, reject) => {
			const xhr = new XMLHttpRequest;
			xhr.onload = () => {
				resolve(JSON.parse(xhr.responseText) as Promise<T>);
			};
			xhr.onerror = xhr.ontimeout = (e) => {
				reject(e);
			};
			xhr.open('get', `${Shikimori.endpoint}${path}?${params.toString()}`);
			xhr.send();
		});
	}
}
