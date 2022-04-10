import { getAnimeOutput } from '../../../../shikimori/src/sharedTypes';

export default function animePoster(data: Partial<getAnimeOutput>): Element {
	const parent = document.createElement('div');
	parent.classList.add('poster', `shikimori-${data.id}`);
	const img = document.createElement('img');
	img.classList.add('lazy');
	img.src = `//shikimori.one${data.image.x48}`;
	img.alt = data.russian ?? data.name;
	parent.appendChild(img);
	return parent;
}
