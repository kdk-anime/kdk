import Config from '../config';

let body: HTMLElement = document.querySelector(Config.DOM.BodySelector());
const header: HTMLElement = document.querySelector(Config.DOM.HeaderSelector());

const resizeHandler = () => {
	body = document.querySelector(Config.DOM.BodySelector());
	if (body.clientWidth < body.clientHeight) {
		header.classList.add('header--horizontal');
	} else {
		header.classList.remove('header--horizontal');
	}
};

resizeHandler();
window.addEventListener('resize', resizeHandler);
