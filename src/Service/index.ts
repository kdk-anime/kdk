import actions from './Actions';
import './Channel';
declare const self: ServiceWorkerGlobalScope;

Object.entries(actions).forEach(([key, func]) => self.addEventListener(key, func));
