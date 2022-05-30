export type PlayerType = 'initial' | 'kodik';

export interface PlayerProvider {
	open();
	close();
}
