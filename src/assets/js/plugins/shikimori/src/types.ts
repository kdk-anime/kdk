export type AnimeListOptions = {
	page?: number,
	limit?: number,
	order?: 'id' | 'id_desc' | 'ranked' | 'kind' | 'popularity' | 'name' | 'aired_on' | 'episodes' | 'status' | 'created_at' | 'created_at_desc' | 'random',
	kind?: 'tv' | 'movie' | 'ova' | 'ona' | 'special' | 'music' | 'tv_13' | 'tv_24' | 'tv_48',
	status?: 'anons' | 'ongoing' | 'released',
	season?: string,
	score?: number,
	duration?: 'S' | 'D' | 'F',
	rating?: 'none' | 'g' | 'pg' | 'pg_13' | 'r' | 'r_plus' | 'rx',
	genre?: number[],
	studios?: number[],
	franchise?: number[],
	censored?: boolean,
	mylist?: 'planned' | 'watching' | 'rewatching' | 'completed' | 'on_hold' | 'dropped',
	ids?: number[],
	exclude_ids?: number[],
	search?: string,
};

export type UserOptions = {
	is_nickname?: '1',
};

export type MangaListOptions = AnimeListOptions;

export type RanobeListOptions = AnimeListOptions;

export type CharacterSearchOptions = {
	search?: string,
};

export type CalendarOptions = {
	censored?: boolean,
};
