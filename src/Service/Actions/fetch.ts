const fetch = (event: FetchEvent) => {
	event.respondWith(caches.open('kdk-cache').then((cache) => {
		return cache.match(event.request).then(async (matching) => {
			return matching || await self.fetch(event.request);
		});
	}));
};

export default fetch;
