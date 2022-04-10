export function importHTML(path: string, selector: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		fetch(path).then(async (res) => {
			const element = document.querySelector(selector);
			if (element === null) {
				throw new Error(`Element "${selector}" not found`);
			}
			element.innerHTML += await res.text();
			resolve(true);
		}, reject);
	});
}
