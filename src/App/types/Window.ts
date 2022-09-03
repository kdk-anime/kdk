import { Container, ContainerCreate } from './Container';

export type WindowProps = {
	x: number
	y: number
	width: number
	height: number
	isOpened: boolean
};

export type Window = {
	open(opts?: Partial<WindowProps>): boolean
	close(): boolean
	move({ x, y }: { x?: number, y?: number }): boolean
	resize({ width, height }: { width?: number, height?: number }): boolean
} & WindowProps & Container;

export type WindowCreate = {
	x?: number,
	y?: number,
	width?: number,
	height?: number,
} & ContainerCreate;
