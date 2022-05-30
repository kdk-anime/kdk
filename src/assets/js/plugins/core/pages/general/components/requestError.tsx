import TSXe from 'tsxe';

export default function requestError(content: string = 'Undefined:error') {
	return <div className='error'>{ content }</div> as HTMLElement;
}

export const requestErrorStyles = {
	'.error': {
		gridColumn: '1/6',
		background: '#d36e6e',
		borderRadius: '8px',
		height: '254px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 'x-large',
		color: '#fff',
		padding: '16px',
		boxSizing: 'bordex-box',
	},
};
