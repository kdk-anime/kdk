import PluginStore from '@kdk/kdk-anime/App/api/PluginStore';
import Header from '@kdk/kdk-anime/App/api/Header';
import Page from '@kdk/kdk-anime/App/api/Page';
import { TSXe } from 'tsxe';
import Panel from '@kdk/kdk-anime/App/api/Panel';
import Window from '@kdk/kdk-anime/App/api/Window';

const store = new PluginStore();

const headerApi = store.new('HeaderAPI') as Header;
const pageApi = store.new('PageAPI') as Page;
const panelApi = store.new('PanelAPI') as Panel;
const windowApi = store.new('WindowAPI') as Window;

/* page api test */
const testPage = pageApi.create({
	name: 'page-test',
});

testPage.container.append(
	<>
		<h1>Hello page!</h1>
	</>,
);

/* window api test */
const testWindow = windowApi.create({
	name: 'window-test',
	width: 300,
	height: 200,
	x: 100,
	y: 100,
});

testWindow.container.append(
	<>
		<h1>Hello window!</h1>
	</>,
);

/* panel api test */
const testPanel = panelApi.create({
	name: 'panel-test',
});

testPanel.container.append(
	<>
		<h1>Hello panel!</h1>
		<button
			onClick={() => {
				if (testWindow.isOpened) {
					testWindow.close();
				} else {
					testWindow.open();
				}
			}}
		>Toggle window</button>
	</>,
);


/* header api test */
const settingsButton = headerApi.create({
	name: 'menu-settings',
	content: 'settings',
	position: 'bottom',
}) as HTMLButtonElement;

settingsButton.addEventListener('click', () => {
	const currentPanel = panelApi.panel;

	if (currentPanel !== null && currentPanel.name === 'panel-test') {
		testPanel.close();
	} else {
		testPanel.open();
	}
});
