type RGB = [number, number, number];
type RGBA = [...RGB, number];
type HEX = string;
type Class<T> = {
	new (...args: unknown[]): T
} & T;

export {
	RGB,
	RGBA,
	HEX,
	Class,
};
