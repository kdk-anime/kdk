import Packet from '../../packet';
import Kodik from '@fleisar/kodik.ts/dist';
export { default } from '@fleisar/kodik.ts/dist';

Packet.link();
Packet.add({ name: 'Kodik', class: Kodik });
