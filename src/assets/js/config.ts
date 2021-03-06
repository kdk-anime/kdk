import { RGB } from './objects/shared';

export type ConfigTree = {
	css: {
		header: {
			background: {
				color: RGB,
				opacity: number,
				highlight: {
					intensity: number,
				},
			},
			icon: {
				color: RGB,
				highlight: {
					color: RGB,
					intensity: number,
				},
			},
			width: number,
			window: {
				width: number,
				text: {
					color: RGB,
				},
			},
		},
	},
	header: {
		horizontalAlign: boolean,
	},
	player: {
		switchByHeader: boolean,
	},
	general: {
		list: 'kodik' | 'shikimori',
		posters: 'shikimori' | 'worldart' | 'imdb' | 'kinopoisk',
		video: 'kodik',
		autoloadTrigger: number,
	}
};

const defaultConfigTree: ConfigTree = {
	css: {
		header: {
			background: {
				color: [0, 0, 0],
				opacity: 0.5,
				highlight: {
					intensity: 0.6,
				},
			},
			icon: {
				color: [255, 255, 255],
				highlight: {
					color: [255, 255, 255],
					intensity: 0.2,
				},
			},
			width: 50,
			window: {
				width: 300,
				text: {
					color: [255, 255, 255],
				},
			},
		},
	},
	header: {
		horizontalAlign: false,
	},
	player: {
		switchByHeader: true,
	},
	general: {
		list: 'kodik',
		posters: 'shikimori',
		video: 'kodik',
		autoloadTrigger: 200,
	},
};

let userConfigTree: Partial<ConfigTree> = {};

export default function Config(): ConfigTree {
	return { ...defaultConfigTree, ...userConfigTree };
}

export function getConfig(): Partial<ConfigTree> {
	return userConfigTree;
}
