export function attachBlob(content: BlobPart, opts: BlobPropertyBag = {}) {
	const blob = new Blob([content], opts);
	console.log(content);
	return URL.createObjectURL(blob);
}
