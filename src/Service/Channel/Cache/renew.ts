const renew = async (requestUrl: string, cacheStore: Cache) => {
	return new Promise((resolve, reject) => {
		fetch(requestUrl).then((response) => {
			if (!response.ok) {
				resolve(false);
			} else {
				cacheStore.put(requestUrl, response);
				resolve(true);
			}
		}).catch(reject);
	});
};

export default renew;
