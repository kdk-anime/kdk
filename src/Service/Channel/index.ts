import Cache from './Cache';

const channel = new BroadcastChannel('kdk-bc');

function send(receiver, action, payload = {}) {
	channel.postMessage({ from: 'worker', receiver, action, payload });
}

function sendError(receiver, message, errorType = 'error') {
	send(receiver, errorType, { message });
}

channel.addEventListener('message', async ({ data }) => {
	const keys = Object.keys(data);
	if (
		!['receiver', 'action', 'from', 'payload'].every((key) => keys.includes(key))
		|| data.reciever !== 'worker'
	) {
		// Invalid construction or not for worker, skipping
		return;
	}

	const cache = await caches.open('kdk-cache');

	switch (data.action) {
		case 'cache':
		case 'erase':
		case 'renew':
			data.payload.urls.forEach((url) => {
				Cache[data.action](url, cache);
			});
			break;
		default:
			sendError(data.from, { message: 'Invalid action' });
	}
});
