export const isSet = (args: any[], atLeastOne: boolean = false) => args[atLeastOne ? 'some' : 'every']((arg) => arg !== undefined && arg !== null);
