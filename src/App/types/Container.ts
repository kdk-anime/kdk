export type Container = {
	name: string
	container: HTMLDivElement
	remove(): boolean
};

export type ContainerCreate = {
	name: string,
	content?: string,
};
