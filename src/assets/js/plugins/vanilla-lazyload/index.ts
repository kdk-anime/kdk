import LazyLoad from 'vanilla-lazyload/dist/lazyload.esm';
import { Packet } from '../../packet';

Packet.link();

Packet.add({ name: 'LazyLoad', class: LazyLoad });
