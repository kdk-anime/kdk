export function watcher<T = any>(callback: (...values: T[]) => any, ...actions: (() => Promise<T>)[]) {
	let values: T[] = [];
	actions.forEach(async (action) => {
		values.push(await action());
		if (values.length === actions.length) {
			callback(...values);
		}
	});
}
