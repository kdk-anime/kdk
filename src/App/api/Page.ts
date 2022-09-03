import Config from '../config';
import Container from './shared/Сontainer';

export default class Page extends Container {
	protected get type() { return 'page'; }

	protected get parent() {
		return document.querySelector(Config.DOM.PageSelector());
	}

	protected createDOMInstance({ name, content }: { name: string; content: string }): HTMLDivElement {
		const div = document.createElement('div');
		Object.assign(div, {
			className: 'page__item',
			id: `page--${name}`,
			innerHTML: content || '',
		});

		return div;
	}
}
