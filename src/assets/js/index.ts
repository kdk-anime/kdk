import { Packet } from './packet';
import Pages, { PageDOM } from './classes/pages';
import Windows, { WindowDOM } from './classes/windows';
import './enchantments';
import Config from './config';

Packet.link();

Packet.add(
	{ name: 'Pages', class: Pages },
	{ name: 'PageDOM', class: PageDOM },
	{ name: 'Windows', class: Windows },
	{ name: 'WindowDOM', class: WindowDOM },
	{ name: 'Config', class: Config },
);


