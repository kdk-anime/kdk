import Config from '../config';

export type ButtonData = {
	page?: string;
	window?: string;
	data?: any;
};

export const buttons: { [key: string]: ButtonData } = {
	general: {
		page: 'core.general',
	},
	recommendation: {
		page: 'core.general',
		data: {
			category: 'recommendation',
		},
	},
	favorite: {
		window: 'core.collections',
		data: {
			directory: 'favorite',
		},
	},
	history: {
		window: 'core.history',
	},
	collections: {
		window: 'core.collections',
	},
	downloads: {
		window: 'node.downloads',
	},
	play: {
		page: 'core.player',
		data: {
			player: 'internal',
			action: 'togglePlay',
			switchPage: Config().player.switchByHeader,
		},
	},
	search: {
		window: 'core.search',
	},
	settings: {
		window: 'core.settings',
	},
};
