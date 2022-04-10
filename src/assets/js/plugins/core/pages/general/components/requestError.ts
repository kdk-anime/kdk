export default function requestError(content: string = 'Undefined:error') {
	const div = document.createElement('div');
	div.classList.add('error');
	div.innerText = content;
	return div;
}
