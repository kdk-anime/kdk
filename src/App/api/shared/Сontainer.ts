import { Container as ContainerType, ContainerCreate } from '../../types/Container';
import { dispatchEvent } from '../../utils/event';


const containers: { [key: string]: { [key: symbol]: unknown } } = {};

export default abstract class Container<TCreate extends ContainerCreate = ContainerCreate, TBase extends ContainerType = ContainerType> {
	protected abstract get type(): string;

	protected abstract get parent(): Element;

	create(args: TCreate) {
		if (!(this.type in containers)) {
			containers[this.type] = {};
		}

		const container = this.createDOMInstance(args);

		const instance = this.createInstance({ ...args, container } as TCreate & Partial<TBase>);

		containers[this.type][args.name] = instance;
		this.parent.append(container);

		return instance;
	}

	protected createInstance(args: Partial<TBase>): TBase {
		const { name, container } = args;
		return {
			name,
			container,
			remove: this.remove.bind(this, name),
		} as unknown as TBase;
	}

	protected createDOMInstance(args: TCreate): HTMLDivElement {
		const { name, content } = args;
		const div = document.createElement('div');
		Object.assign(div, {
			className: 'container__item',
			id: `container--${name}`,
			innerHTML: content || '',
		});

		return div;
	}

	get(name: string): TBase | null {
		return containers[this.type][name] || null;
	}

	remove(name: string): boolean {
		if (!(name in containers[this.type])) {
			return false;
		}

		const container: TBase['container'] = containers[this.type][name].container;
		const eventResponse = dispatchEvent(container, 'containerRemove');

		if (eventResponse) {
			container.remove();
			delete containers[this.type][name];
		}

		return eventResponse;
	}
}
