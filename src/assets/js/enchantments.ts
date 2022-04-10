function windowSizes(height?: number) {
	document.querySelector('body').style.setProperty('--window-height', `${height ?? (window.innerHeight - 12)}px`);
}

windowSizes();
window.addEventListener('resize', () => windowSizes());

document.querySelector<HTMLElement>('.header__left>button,.header__right>button').addEventListener('mousemove', function (e) {
	const { offsetX, offsetY } = e;
	this.style.setProperty('--x', `${offsetX}px`);
	this.style.setProperty('--y', `${offsetY}px`);
});
