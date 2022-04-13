function windowSizes(width?: number, height?: number) {
	const body = document.querySelector('body');
	body.style.setProperty('--window-height', `${height ?? (window.innerHeight - 12)}px`);
	body.style.setProperty('--window-width', `${width ?? window.innerWidth}px`);
}

windowSizes();
window.addEventListener('resize', () => windowSizes());

document.querySelector<HTMLElement>('.header__left>button,.header__right>button').addEventListener('mousemove', function (e) {
	const { offsetX, offsetY } = e;
	this.style.setProperty('--x', `${offsetX}px`);
	this.style.setProperty('--y', `${offsetY}px`);
});
