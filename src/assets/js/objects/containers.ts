export interface ContainerHandler<T = any> {
	roots: string[],
	handler: (root?: string, data?: T) => boolean,
	open?: (root?: string, data?: T) => boolean,
	close?: (root?: string, data?: T) => boolean,
	setup?: () => Promise<boolean> | boolean,
}

export interface ContainerState<T = any> {
	name: string,
	root: string,
	handler: ContainerHandler<T>,
}

export interface ContainerDOM {
	name: string;
	selector: string;
	element: Element;
}
