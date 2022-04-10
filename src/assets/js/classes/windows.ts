import { DOM } from '../DOM';
import { ContainerDOM, ContainerHandler, ContainerState } from '../objects/containers';
import { ObjectStore } from '../objects/shared';

export default class Windows {

	static state: ContainerState | null = null;

	static handlers: ObjectStore<ContainerHandler> = {};

	static open<T = any>(name: string, data?: T): void {
		const roots = name.split('.');
		const handler = Windows.handlers[roots[0]];
		if (!handler) {
			throw new Error('Window handler not registered');
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
			Windows.state = {
				name: roots[0],
				root,
				handler,
			};
		}
	}

	static close<T = any>(data?: T): void {
		Windows.state?.handler.close(Windows.state.root, data);
		Windows.state = null;
	}

	static register(name: string, handler: ContainerHandler): void {
		if (Object.keys(Windows.handlers).indexOf(name) !== -1) {
			throw new Error('This handler is already exists');
		}
		Windows.handlers[name] = handler;
		if (handler.setup) {
			handler.setup();
		}
	}
}

export class WindowDOM {
	static state: ContainerDOM | null = null;

	static containers: { [key: string]: ContainerDOM } = {};

	static reserveContainer(name: string) {
		if (WindowDOM.containers[name]) {
			throw new Error('Container with this name is already reserved');
		}
		const container = document.createElement('div');
		container.classList.add('window', name, 'window--hidden');
		const dom = document.querySelector(DOM.windows());
		dom.appendChild(container);
		WindowDOM.containers[name] = {
			name,
			selector: DOM.window(name),
			element: container,
		};
	}

	static getContainer(name: string) {
		const container = WindowDOM.containers[name];
		if (!container) {
			throw new Error('Container with this name is not exist');
		}
		return container.element;
	}

	static expand() {
		const dom = document.querySelector(DOM.header());
		if (!dom.classList.contains('header--expand')) {
			dom.classList.add('header--expand');
		}
	}

	static collapse() {
		const dom = document.querySelector(DOM.header());
		dom.classList.remove('header--expand');
	}

	static switchTo(name: string) {
		const currentWindow = WindowDOM.state;
		const newWindow = WindowDOM.getContainer(name);
		if (currentWindow) {
			if (!currentWindow.element.classList.contains('page--hidden')) {
				currentWindow.element.classList.add('page--hidden');
			}
		}
		if (newWindow.classList.contains('page--hidden')) {
			newWindow.classList.remove('page--hidden');
		}
		WindowDOM.state = WindowDOM.containers[name];
	}
}
