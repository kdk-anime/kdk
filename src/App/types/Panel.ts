import { Container } from './Container';

export type Panel = {
	open(): boolean,
	close(): boolean,
} & Container;
