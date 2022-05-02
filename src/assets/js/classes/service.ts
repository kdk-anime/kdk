const channel = new BroadcastChannel('core.kdk.channel');

export class Service {
	static send(data: any) {
		channel.postMessage(data);
	}

	static cacheResources(...url: string[]) {
		Service.send({ method: 'cache-add', list: url });
	}

	static deleteResources(...url: string[]) {
		Service.send({ method: 'cache-delete', list: url });
	}
}
