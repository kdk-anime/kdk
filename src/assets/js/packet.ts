export type PacketUnit = { name: string, class: any };

export default class Packet {
	static store: Record<string, any> = {
		gloabal: {},
	};

	static listeners = {};

	static add(...elements: PacketUnit[]) {
		elements.forEach((element) => {
			Packet.store[element.name] = element.class;
			if (this.listeners[element.name]) {
				this.listeners[element.name].forEach((listener) => listener());
			}
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

	static pluginsAwait(names: string[], callback: () => void) {
		let loaded = 0;
		const checkProgress = () => {
			if (loaded === names.length) {
				callback();
			}
		};
		names.forEach((name) => {
			if (Packet.store[name]) {
				loaded += 1;
				return checkProgress();
			}
			if (!Packet.listeners[name]) {
				Packet.listeners[name] = [];
			}
			Packet.listeners[name].push(() => {
				loaded += 1;
				checkProgress();
			});
		});
	}
}
