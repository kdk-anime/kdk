export type {};
declare const self: ServiceWorkerGlobalScope;

const channel = new BroadcastChannel('core.kdk.channel');

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open('store').then((cache) => {
			return cache.addAll([
				'index.html',
				'manifest.json',
				'assets/js/index.js',
			]);
		}),
	);
});
self.addEventListener('fetch', (event) => {
	const request = event.request;
	if (request.method === 'GET' && request.url.startsWith(self.origin)) {
		event.respondWith(
			caches.match(request).then((response) => {
				return (
					response ||
					fetch(request)
				);
			}),
		);
	}
});
channel.addEventListener('message', async (event) => {
	const { method, list } = { method: undefined, list: [], ...(event.data as Record<string, any>) };
	const cache = await caches.open('store');
	switch (method) {
		case 'cache-add':
			await cache.addAll(list);
			break;
		case 'cache-delete':
			list.forEach((item) => {
				cache.delete(item);
			});
			break;
		case 'cache-truncate':
			await caches.delete('store');
			break;
		default:
			throw new Error(`Invalid method: ${method}`);
	}
});
