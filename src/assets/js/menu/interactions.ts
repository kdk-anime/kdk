import { buttons } from './buttons';
import Packet from '../packet';

Packet.link();

document.querySelectorAll('header button').forEach((element) => {
	element.addEventListener('click', (event) => {
		const target = (event.currentTarget as HTMLElement).dataset.target;
		if (Object.keys(buttons).indexOf(target) === -1) {
			throw new Error('Invalid target');
		}
		const rule = buttons[target];
		if (rule.window) {
			const { Windows } = Packet.store;
			Windows.open(rule.window, rule.data);
		}
		if (rule.page) {
			const { Pages } = Packet.store;
			Pages.open(rule.page, rule.data);
		}
	}, false);
});
