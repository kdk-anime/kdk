export const dispatchEvent = (element: Element, name: string, opts?: EventInit): boolean => {
	const event = new Event(name, {
		...opts,
	});

	return element.dispatchEvent(event);
};
