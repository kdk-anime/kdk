const install = (event: ExtendableEvent) => {
	console.log(event, 'before');
	event.waitUntil(() => caches.open('kdk-cache').then((cache) => {
		return cache.addAll([
			'./index.html',
			'./manifest.json',
			'./plugins.json',
			'./App/index.js',
			'./assets/index.css',
			'./assets/fonts/Material-Icons/stylesheet.css',
			'./assets/fonts/Open Sans/stylesheet.css',
			'./assets/fonts/Material-Icons/MaterialIcons-Regular.ttf',
			'./assets/fonts/Material-Icons/MaterialIcons-Regular.codepoints',
			'./assets/fonts/Open Sans/OpenSans-Bold.eot',
			'./assets/fonts/Open Sans/OpenSans-Bold.ttf',
			'./assets/fonts/Open Sans/OpenSans-Bold.woff',
			'./assets/fonts/Open Sans/OpenSans-BoldItalic.eot',
			'./assets/fonts/Open Sans/OpenSans-BoldItalic.ttf',
			'./assets/fonts/Open Sans/OpenSans-BoldItalic.woff',
			'./assets/fonts/Open Sans/OpenSans-ExtraBold.eot',
			'./assets/fonts/Open Sans/OpenSans-ExtraBold.ttf',
			'./assets/fonts/Open Sans/OpenSans-ExtraBold.woff',
			'./assets/fonts/Open Sans/OpenSans-ExtraBoldItalic.eot',
			'./assets/fonts/Open Sans/OpenSans-ExtraBoldItalic.ttf',
			'./assets/fonts/Open Sans/OpenSans-ExtraBoldItalic.woff',
			'./assets/fonts/Open Sans/OpenSans-Italic.eot',
			'./assets/fonts/Open Sans/OpenSans-Italic.ttf',
			'./assets/fonts/Open Sans/OpenSans-Italic.woff',
			'./assets/fonts/Open Sans/OpenSans-Light.eot',
			'./assets/fonts/Open Sans/OpenSans-Light.ttf',
			'./assets/fonts/Open Sans/OpenSans-Light.woff',
			'./assets/fonts/Open Sans/OpenSans-LightItalic.eot',
			'./assets/fonts/Open Sans/OpenSans-LightItalic.ttf',
			'./assets/fonts/Open Sans/OpenSans-LightItalic.woff',
			'./assets/fonts/Open Sans/OpenSans-Regular.eot',
			'./assets/fonts/Open Sans/OpenSans-Regular.ttf',
			'./assets/fonts/Open Sans/OpenSans-Regular.woff',
		]);
	}),
	);
};

export default install;
