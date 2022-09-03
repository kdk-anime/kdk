if ('serviceWorker' in window.navigator) {
	const swContainer = window.navigator.serviceWorker;

	swContainer.register('./service.js').catch((e) => {
		alert('Failed to install service worker');
		console.error(e);
	});
} else {
	alert('Your browser does not support service workers. It may cause some errors and bugs');
}
