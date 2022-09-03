const HeaderSelector = () => '.header';
const HeaderTopSelector = () => '.header__left';
const HeaderBottomSelector = () => '.header__right';
const PanelSelector = () => '.panel__container';
const PanelItemSelector = ({ name }: { name: string }) => `.panel__item#panel--${name}`;
const WindowSelector = () => '.windows';
const WindowItemSelector = ({ name }: { name: string }) => `.window__item#window--${name}`;
const PageSelector = () => 'main';
const PageItemSelector = ({ name }: { name: string }) => `.page__item#page--${name}`;
const BodySelector = () => '.body';

export {
	HeaderSelector,
	HeaderTopSelector,
	HeaderBottomSelector,
	PanelSelector,
	PanelItemSelector,
	WindowSelector,
	WindowItemSelector,
	PageSelector,
	PageItemSelector,
	BodySelector,
};
