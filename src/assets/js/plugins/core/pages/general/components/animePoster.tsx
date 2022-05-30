import { getAnimeOutput } from '@kdk-core/plugins/shikimori/src/sharedTypes';
import TSXe from 'tsxe';

export default function animePoster(data: Partial<getAnimeOutput>): Element {
	const playerData = JSON.stringify({
		player: 'kodik',
		params: { shikimori_id: data.id },
	});
	return <div className={['poster', `shikimori-${data.id}`].join(' ')} dataset={ { playerData } }>
		<img className='lazy' src={ `//shikimori.one${data.image.x48}` } alt={ data.russian ?? data.name }/>
		<div className='poster__overlay'>
			<div className='poster__title'>
				<h2 className='poster__titleLocal'>{ data.russian }</h2>
				<span className='poster__titleOriginal'>{ data.name }</span>
			</div>
		</div>
	</div> as Element;
}

export const animePosterStyles = {
	'.poster': {
		width: '180px',
		height: '254px',
		overflow: 'hidden',
		borderRadius: '8px',
		boxShadow: '0 4px 8px 0 #0007',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: '#000',
		position: 'relative',
		transition: '.2s',
		img: {
			width: '100%',
		},
		'&.not-found': {
			img: {
				filter: 'blur(4px) brightness(.5)',
			},
		},
		'&:not(.not-found)': {
			cursor: 'pointer',
			'.poster__overlay': {
				opacity: 0,
			},
			'&:hover': {
				transform: 'scale(1.2)',
				boxShadow: '0 0 2px 0 #0007',
			},
		},
		'&--flipped:not(.not-found):hover': {
			img: {
				filter: 'blur(16px)',
			},
			'.poster__overlay': {
				opacity: 1,
			},
		},
		'&__overlay': {
			position: 'absolute',
			width: '100%',
			height: '100%',
			background: 'linear-gradient(#fff7, #0007)',
			WebkitTextStroke: '.5px #000',
			display: 'flex',
			color: '#fff',
			alignItems: 'center',
			justifyContent: 'center',
			boxShadow: 'inset 0 0 0 3px #fff8',
			borderRadius: '8px',
			textAlign: 'center',
			padding: '8px',
			boxSizing: 'border-box',
			userSelect: 'none',
			transition: '.2s',
		},
		'&__title': {
			'&Local': {
				margin: 0,
				maxHeight: '70px',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
			},
			'&Original': {
				fontSize: 'small',
				opacity: '.5',
				WebkitTextStroke: 'initial',
			},
		},
	},
};
