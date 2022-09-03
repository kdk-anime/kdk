function setStyle(target: HTMLElement, styles: Partial<CSSStyleDeclaration | Record<string, any>>) {
	const { style } = target;
	Object.entries(styles).forEach(([key, value]) => {
		if (key in target.style) {
			style[key] = value.toString();
		} else {
			style.setProperty(key, value.toString());
		}
	});
}

function windowSizes(width?: number, height?: number) {
	setStyle(document.body, {
		'--window-height': `${height ?? window.innerHeight}px`,
		'--window-width': `${width ?? window.innerWidth}px`,
	});
}

windowSizes();
window.addEventListener('resize', () => windowSizes());

export {
	setStyle,
};
