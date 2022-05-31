export function attachBlob(content: BlobPart, opts: BlobPropertyBag = {}) {
	const blob = new Blob([content], opts);
	return URL.createObjectURL(blob);
}
