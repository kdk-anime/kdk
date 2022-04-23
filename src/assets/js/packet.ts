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
}
