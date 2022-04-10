import { buttons } from './buttons.js';
import Windows from '../classes/windows.js';

$('header button').on('click', function () {
	const target = $(this).data('target');
	if (Object.keys(buttons).indexOf(target) === -1) {
		throw new Error('Invalid target');
	}
	const rule = buttons[target];
	if (rule.window) {
		Windows.open(rule.window, rule.data);
	}
});
