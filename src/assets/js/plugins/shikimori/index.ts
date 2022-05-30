import Packet from '@kdk-core/packet';
import Shikimori from './src';

Packet.link();

Packet.add({ name: 'Shikimori', class: Shikimori });
