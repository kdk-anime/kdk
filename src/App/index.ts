import './api';
import { Plugins as PluginsLoad } from './services';
import Config from './config';

PluginsLoad(Config.Service.PluginListStrictMode).then();
