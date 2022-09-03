import install from './install';
import fetch from './fetch';

const actions: Partial<Record<keyof ServiceWorkerGlobalScopeEventMap, (event: unknown) => any>> = {
	install,
	fetch,
};

export default actions;
