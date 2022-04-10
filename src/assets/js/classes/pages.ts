import { DOM } from '../DOM';
import { ContainerDOM, ContainerHandler, ContainerState } from '../objects/containers';
import { ObjectStore } from '../objects/shared';

export default class Pages {

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
			throw new Error('This handler is already exists');
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

	static reserveContainer(name: string) {
		if (PageDOM.containers[name]) {
			throw new Error('Container with this name is already reserved');
		}
		const container = document.createElement('div');
		container.classList.add('page', name);
		const dom = document.querySelector(DOM.main());
		dom.appendChild(container);
		PageDOM.containers[name] = {
			name,
			selector: DOM.page(name),
			element: container,
		};
	}

	static getContainer(name: string) {
		const container = PageDOM.containers[name];
		if (!container) {
			throw new Error('Container with this name is not exist');
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
