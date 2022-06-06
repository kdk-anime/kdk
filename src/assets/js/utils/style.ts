export class Style {
	preStyle: string[];

	postStyle: string[];

	styleObject: Record<string, any>;

	styles(): string {
		return `${this.preStyle.join('')}${this.prepare(this.styleObject)}${this.postStyle.join('')}`;
	}

	constructor(style: Record<string, any>) {
		this.styleObject = style;
		this.preStyle = [];
		this.postStyle = [];
	}

	converter(object: Record<string, any>, root: string = ''): string[][] {
		const properties: string[] = [];
		const elements: string[] = [];
		Object.entries(object).forEach(([name, value]) => {
			const cssName = name.replaceAll(/[A-Z]/g, (sub) => `-${sub.toLowerCase()}`);
			if (typeof value === 'object') {
				const path = name.startsWith('&') ? `${root}${name.slice(1)}` : `${root} ${name}`;
				const [elementProps, subElements] = this.converter(value, path);
				elements.push(`${path}{${elementProps.join(';')}}`.trim(), ...subElements);
			} else {
				properties.push(`${cssName}:${value}`);
			}
		});
		return [properties, elements];
	}

	prepare(object: Record<string, any>): string {
		return this.converter(object)[1].join('');
	}

	import(url: string) {
		this.importRaw(`url(${url})`);
	}

	importRaw(string: string) {
		this.preStyle.push(`@import ${string};`);
	}

	media(expression: string, styles: object, postStyle: boolean = false) {
		this[`${postStyle ? 'post' : 'pre' }Style`].push(`@media ${expression} {${this.prepare(styles)}}`);
	}
}
