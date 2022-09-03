const erase = (requestUrl: string, cacheStore: Cache) => {
	return cacheStore.delete(requestUrl);
};

export default erase;
