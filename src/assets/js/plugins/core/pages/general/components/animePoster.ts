import { getAnimeOutput } from '../../../../shikimori/src/sharedTypes';

export default function animePoster(data: Partial<getAnimeOutput>): Element {
	const parent = document.createElement('div');
	parent.classList.add('poster', `shikimori-${data.id}`);
	parent.dataset.playerData = JSON.stringify({
		player: 'kodik',
		params: {
			shikimori_id: data.id,
		},
	});

	const img = document.createElement('img');
	img.classList.add('lazy');
	img.src = `//shikimori.one${data.image.x48}`;
	img.alt = data.russian ?? data.name;

	const overlay = document.createElement('div');
	overlay.classList.add('poster__overlay');
	const posterTitle = document.createElement('div');
	const posterTitleLocal = document.createElement('h2');
	posterTitleLocal.classList.add('poster__titleLocal');
	posterTitleLocal.innerText = data.russian;
	const posterTitleOriginal = document.createElement('span');
	posterTitleOriginal.classList.add('poster__titleOriginal');
	posterTitleOriginal.innerText = data.name;
	parent.appendChild(img);
	posterTitle.appendChild(posterTitleLocal);
	posterTitle.appendChild(posterTitleOriginal);
	overlay.appendChild(posterTitle);
	parent.appendChild(overlay);
	return parent;
}
