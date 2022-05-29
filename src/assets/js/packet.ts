export type PacketUnit = { name: string, class: any };

export class Packet {
	static store: Record<string, any> = {
		gloabal: {},
	};

	static add(...elements: PacketUnit[]) {
		elements.forEach((element) => {
			Packet.store[element.name] = element.class;
		});
	}

	static link() {
		let sharedPacket = (window as Record<string, any>).Packet;
		if (sharedPacket) {
			Packet.store = sharedPacket;
		} else {
			(window as Record<string, any>).Packet = Packet.store;
		}
	}

	static pluginLoad(...urls: string[]) {
		const results = [0, 0];
		let content: Record<string, string> = {};
		const handler = () => {
			if (results.reduce((a, v) => (a + v), 0) === urls.length) {
				if (results[1] !== 0) {
					const ignoreErrors = confirm('Resources downloaded with errors.\nContinue anyway?');
					if (!ignoreErrors) {
						throw new Error('Resources downloaded with errors');
					}
				}
				Object.entries(content).forEach(([name, file]) => {
					const script = document.createElement('script');
					script.dataset.src = name;
					script.innerHTML = file;
					document.head.appendChild(script);
				});
			}
		};
		urls.forEach((url) => {
			fetch(url).then( async (data) => {
				content[url] = await data.text();
				results[0]++;
				handler();
			}).catch((err) => {
				console.error('Error during loading resources:', err);
				results[1]++;
				handler();
			});
		});
	}
}
