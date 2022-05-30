import { ContainerHandler } from '@kdk-core/objects/containers';
import Packet from '@kdk-core/packet';
import TSXe from 'tsxe';
import { Style } from '@kdk-core/utils/style';
import KodikPlayer from './kodik';
import { PlayerType } from './types';

Packet.link();
const { PageDOM } = Packet.store;

export default class Player implements Partial<ContainerHandler> {
	currentPlayer: KodikPlayer | null = null;

	open(root: string, data: { player: PlayerType, params: Record<string, any> }) {
		const { player, params } = { player: 'kodik', ...data };
		const container = PageDOM.getContainer('core-player');
		switch (player) {
			case 'kodik':
				this.currentPlayer = new KodikPlayer(container, params);
				break;
			case 'initial':
				// ignore
				break;
			default:
				throw new Error('Unknown player type');
		}
		PageDOM.switchTo('core-player');
		return true;
	}

	close() {
		if (this.currentPlayer) {
			this.currentPlayer.close();
		}
		return true;
	}

	private styles = {
		'.core-player': {
			paddingLeft: '50px',
			background: '#000',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			boxSizing: 'border-box',
			'.player': {
				width: '100%',
				maxWidth: '1280px',
				height: '100%',
				maxHeight: '720px',
				iframe: {
					border: 'none',
					width: '100%',
					height: '100%',
				},
			},
		},
	};

	async setup() {
		const container = PageDOM.reserveContainer('core-player');
		container.appendChild(
			<>
				<style>{ (new Style(this.styles)).styles() }</style>
				<div class="player"></div>
			</> as Node,
		);
		return true;
	}
}
