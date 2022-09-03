import Config from '../config';
import Container from './shared/Сontainer';
import { Window as WindowType, WindowCreate, WindowProps } from '../types/Window';
import { dispatchEvent, isSet } from '../utils';

export default class Window extends Container<WindowCreate, WindowType> {
	protected get type() { return 'window'; }

	protected get parent() {
		return document.querySelector(Config.DOM.WindowSelector());
	}

	protected createInstance(args) {
		const { name, container, x, y, height, width } = args;
		const base = super.createInstance({ name, container });

		return {
			...base,
			x: x || 0,
			y: y || 0,
			width: width || 300,
			height: height || 100,
			isOpened: false,
			open: (opts) => this.open(name, opts),
			close: () => this.close(name),
			move: (cords) => this.move(name, cords),
			resize: (sizes) => this.resize(name, sizes),
		};
	}

	protected createDOMInstance(args) {
		const { name, content, x, y, width, height } = args;
		const div = document.createElement('div');
		Object.assign(div, {
			className: 'window__item',
			id: `window--${name}`,
			innerHTML: content || '',
		});
		Object.entries({ left: x, top: y, width, height })
			.filter(e=>e)
			.forEach(([prop, value]) => div.style.setProperty(prop, `${value}px`));

		return div;
	}

	protected updateProps(name: string, props: Partial<WindowProps>) {
		if (isSet([props.x, props.y], true)) {
			this.move(name, props);
		}
		if (isSet([props.width, props.height], true)) {
			this.resize(name, props);
		}
	}

	open(name: string, opts?: Parameters<WindowType['open']>[0]): ReturnType<WindowType['open']> {
		const window = this.get(name);

		if (window === null) {
			throw new Error('Window not found');
		}

		const eventResponse = dispatchEvent(window.container, 'windowOpen');

		if (eventResponse) {
			window.container.classList.add('window--active');

			this.updateProps(name, opts ?? {});
			window.isOpened = true;
		}

		return eventResponse;
	}

	protected dispatchEvent(name: string, event: string, handler: (window: WindowType) => any): boolean {
		const window = this.get(name);

		if (window === null) {
			throw new Error('Window not found');
		}

		const eventResponse = dispatchEvent(window.container, 'windowMove');

		if (eventResponse) {
			handler(window);
		}

		return eventResponse;
	}

	move(name: string, cords: Parameters<WindowType['move']>[0]): ReturnType<WindowType['move']> {
		return this.dispatchEvent(name, 'windowMove', (window) => {
			const { x, y } = {
				...window,
				...cords,
			};

			Object.assign(window.container.style, {
				x: `${x}px`,
				y: `${y}px`,
			});
			Object.assign(window, { x, y });
		});
	}

	resize(name: string, sizes: Parameters<WindowType['resize']>[0]): ReturnType<WindowType['move']> {
		return this.dispatchEvent(name, 'windowResize', (window) => {
			const { width, height } = {
				...window,
				...sizes,
			};

			Object.assign(window.container.style, {
				width: `${width}px`,
				height: `${height}px`,
			});
			Object.assign(window, { width, height });
		});
	}

	close(name: string): ReturnType<WindowType['close']> {
		return this.dispatchEvent(name, 'windowClose', (window) => {
			window.container.classList.remove('window--active');
			window.isOpened = false;
		});
	}
}
