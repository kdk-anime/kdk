export namespace DOM {
	export const header = () => 'header.header';
	export const windows = () => `${header()}>div.windows`;
	export const window = (name: string) => `${windows()}>div.window.${name}`;
	export const main = () => 'main';
	export const page = (name) => `${main()}>div.page.${name}`;
}
