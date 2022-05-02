import { Packet } from './packet';
import Pages, { PageDOM } from './classes/pages';
import Windows, { WindowDOM } from './classes/windows';
import './enchantments';
import './menu/interactions';
import Config from './config';
// import { Service } from './classes/service';

Packet.link();

Packet.add(
	{ name: 'Pages', class: Pages },
	{ name: 'PageDOM', class: PageDOM },
	{ name: 'Windows', class: Windows },
	{ name: 'WindowDOM', class: WindowDOM },
	{ name: 'Config', class: Config },
);

// Service.cacheResources(
// 	// css & its deps
// 	'assets/index.css',
// 	'assets/fonts/Open Sans/stylesheet.css',
// 	'assets/fonts/Material-Icons/stylesheet.css',
// 	// fonts
// 	// TODO: make an individual cache depends on browser and its version to reduce cache size
// 	'assets/fonts/Material-Icons/MaterialIcons-Regular.ttf',
// 	'assets/fonts/Material-Icons/MaterialIcons-Regular.codepoints',
// 	'assets/fonts/Open Sans/OpenSans-Bold.eot',
// 	'assets/fonts/Open Sans/OpenSans-Bold.ttf',
// 	'assets/fonts/Open Sans/OpenSans-Bold.woff',
// 	'assets/fonts/Open Sans/OpenSans-BoldItalic.eot',
// 	'assets/fonts/Open Sans/OpenSans-BoldItalic.ttf',
// 	'assets/fonts/Open Sans/OpenSans-BoldItalic.woff',
// 	'assets/fonts/Open Sans/OpenSans-ExtraBold.eot',
// 	'assets/fonts/Open Sans/OpenSans-ExtraBold.ttf',
// 	'assets/fonts/Open Sans/OpenSans-ExtraBold.woff',
// 	'assets/fonts/Open Sans/OpenSans-ExtraBoldItalic.eot',
// 	'assets/fonts/Open Sans/OpenSans-ExtraBoldItalic.ttf',
// 	'assets/fonts/Open Sans/OpenSans-ExtraBoldItalic.woff',
// 	'assets/fonts/Open Sans/OpenSans-Italic.eot',
// 	'assets/fonts/Open Sans/OpenSans-Italic.ttf',
// 	'assets/fonts/Open Sans/OpenSans-Italic.woff',
// 	'assets/fonts/Open Sans/OpenSans-Light.eot',
// 	'assets/fonts/Open Sans/OpenSans-Light.ttf',
// 	'assets/fonts/Open Sans/OpenSans-Light.woff',
// 	'assets/fonts/Open Sans/OpenSans-LightItalic.eot',
// 	'assets/fonts/Open Sans/OpenSans-LightItalic.ttf',
// 	'assets/fonts/Open Sans/OpenSans-LightItalic.woff',
// 	'assets/fonts/Open Sans/OpenSans-Regular.eot',
// 	'assets/fonts/Open Sans/OpenSans-Regular.ttf',
// 	'assets/fonts/Open Sans/OpenSans-Regular.woff',
// );
//
// if (!('serviceWorker' in navigator)) {
// 	alert('Your browser does not support service workers it may cause some errors in duration of using application');
// }
//
// navigator.serviceWorker.register('./worker.js').then((registration) => {
// 	console.log('Service worker was installed successfully', registration);
// }, (error) => {
// 	console.log('Unable to register service worker.', error);
// });


