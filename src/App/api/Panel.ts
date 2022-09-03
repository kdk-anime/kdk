import Config from '../config';
import Container from './shared/Сontainer';
import { dispatchEvent } from '../utils/event';
import { Panel as PanelType } from '../types/Panel';
import { ContainerCreate } from '../types/Container';

const state: {
	panel?: string
} = {
	panel: undefined,
};

export default class Panel extends Container<ContainerCreate, PanelType> {
	protected get type() { return 'panel'; }

	public get panel() { return state.panel ? this.get(state.panel) : null; }

	protected get parent() {
		return document.querySelector(Config.DOM.PanelSelector());
	}

	protected header = document.querySelector(Config.DOM.HeaderSelector());

	protected createInstance(args) {
		const { name } = args;
		const base = super.createInstance(args);

		return {
			...base,
			open: () => this.open(name),
			close: () => this.close(),
		};
	}

	protected createDOMInstance({ name, content }: { name: string; content: string }): HTMLDivElement {
		const div = document.createElement('div');
		Object.assign(div, {
			className: 'panel__item',
			id: `panel--${name}`,
			innerHTML: content || '',
		});

		return div;
	}

	public open(name: string): boolean {
		if (state.panel !== undefined && !this.close(true)) {
			return false;
		}

		const panel = this.get(name);
		const eventResponse = dispatchEvent(panel.container, 'openPanel');

		if (eventResponse) {
			const header = this.header;

			header.classList.add('header--expand');
			panel.container.classList.add('panel__item--active');

			state.panel = name;
		}

		return eventResponse;
	}

	public close(keepHeader = false): boolean {
		const { panel: name } = state;
		const { container } = this.get(name);

		const eventResponse = dispatchEvent(container, 'closePanel');

		if (eventResponse) {
			if (!keepHeader) {
				const header = this.header;
				header.classList.remove('header--expand');
			}

			container.classList.remove('panel__item--active');

			state.panel = undefined;
		}

		return eventResponse;
	}
}
