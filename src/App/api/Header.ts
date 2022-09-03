import Config from '../config';

const buttons: {
	[x in 'top' | 'bottom']: {
		[key: symbol]: HTMLButtonElement,
	}
} = {
	top: {},
	bottom: {},
};

export default class Header {
	get orientation() {
		const header = document.querySelector(Config.DOM.HeaderSelector());
		return header.classList.contains('header--vertical')
			|| !header.classList.contains('header--horizontal')
			? 0
			: 1;
	}

	create(args: {
		name: string,
		content?: string,
		position?: 'top' | 'bottom'
	}): HTMLButtonElement | false {
		const { name, content, position } = {
			content: '',
			position: 'top',
			... args,
		};

		if (name in buttons.top || name in buttons.bottom) {
			return false;
		}

		const parent = document.querySelector(
			position === 'top'
				? Config.DOM.HeaderTopSelector()
				: Config.DOM.HeaderBottomSelector(),
		);

		const button = document.createElement('button');
		Object.assign(button, {
			innerHTML: content,
		});

		const li = document.createElement('li');
		li.append(button);

		buttons[position][name] = button;
		parent.append(li);

		return button;
	}

	get(name: string): HTMLButtonElement | null {
		return buttons.top[name] || buttons.bottom[name] || null;
	}

	remove(name: string): boolean {
		if (!(name in buttons.top) && !(name in buttons.bottom)) {
			return false;
		}

		if (name in buttons.top) {
			buttons.top[name].remove();
			delete buttons.top[name];
		}

		if (name in buttons.bottom) {
			buttons.bottom[name].remove();
			delete buttons.bottom[name];
		}
	}
}
