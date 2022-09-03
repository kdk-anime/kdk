import renew from './renew';

const cache = (requestUrl: string, cacheStore: Cache) => {
	return new Promise(async (resolve, reject) => {
		if (await cacheStore.match(requestUrl)) {
			resolve(true);
		} else {
			renew(requestUrl, cacheStore).then(resolve, reject);
		}
	});
};

export default cache;
