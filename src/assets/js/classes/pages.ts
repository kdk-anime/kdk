import { DOM } from '../DOM';
import { ContainerDOM, ContainerHandler, ContainerState } from '../objects/containers';
import { ObjectStore } from '../objects/shared';

export type PagesType = {
	state: ContainerState | null,
	handlers: ObjectStore<ContainerHandler>,
	open<T = any>(name: string, data?: T): void,
	close<T = any>(data?: T): void,
	register(name: string, handler: ContainerHandler): void,
};

export type PageDOMType = {
	state: ContainerDOM | null,
	containers: { [key: string]: ContainerDOM },
	reserveContainer(name: string): HTMLElement,
	getContainer(name: string): HTMLElement,
	switchTo(name: string),
};

export class Pages {

	static state: ContainerState | null = null;

	static handlers: ObjectStore<ContainerHandler> = {};

	static open<T = any>(name: string, data?: T): void {
		const roots = name.split('.');
		const handler = Pages.handlers[roots[0]];
		if (!handler) {
			throw new Error('Page handler not registered');
		}
		const root = roots.slice(1).join('.');
		if (handler.roots.indexOf(root) === -1) {
			throw new Error(`"${root}" is not registered for ${roots[0]}`);
		}
		if (Pages.state !== null) {
			Pages.close();
		}
		let openState;
		if (handler.open !== undefined) {
			openState = handler.open(root, data);
		} else {
			openState = handler.handler(root, data);
		}
		if (openState) {
			Pages.state = {
				name: roots[0],
				root,
				handler,
			};
		}
	}

	static close<T = any>(data?: T): void {
		Pages.state?.handler.close(Pages.state.root, data);
		Pages.state = null;
	}

	static register(name: string, handler: ContainerHandler): void {
		if (Object.keys(Pages.handlers).indexOf(name) !== -1) {
			throw new Error(`Handler "${name}" is already exists`);
		}
		Pages.handlers[name] = handler;
		if (handler.setup) {
			handler.setup();
		}
	}
}

export class PageDOM {
	static state: ContainerDOM | null = null;

	static containers: { [key: string]: ContainerDOM } = {};

	static reserveContainer(name: string): HTMLElement {
		if (PageDOM.containers[name]) {
			throw new Error(`Container "${name}" is already reserved`);
		}
		const container = document.createElement('div');
		container.classList.add('page', 'page--hidden', name);
		const dom = document.querySelector<HTMLElement>(DOM.main());
		dom.appendChild(container);
		PageDOM.containers[name] = {
			name,
			selector: DOM.page(name),
			element: container,
		};
		return container;
	}

	static getContainer(name: string): HTMLElement {
		const container = PageDOM.containers[name];
		if (!container) {
			throw new Error(`Container "${name}" is not exist`);
		}
		return container.element;
	}

	static switchTo(name: string) {
		const currentPage = PageDOM.state;
		const newPage = PageDOM.getContainer(name);
		if (currentPage) {
			if (!currentPage.element.classList.contains('page--hidden')) {
				currentPage.element.classList.add('page--hidden');
			}
		}
		if (newPage.classList.contains('page--hidden')) {
			newPage.classList.remove('page--hidden');
		}
		PageDOM.state = PageDOM.containers[name];
	}
}
