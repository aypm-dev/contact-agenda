import { browser } from "$app/environment";

export const browserLocalGet = (key: string) => {
	if (browser) {
		const item = localStorage.getItem(key);
		if (item) {
			return item;
		}
	}
	return null;
};
export const browserLocalSet = (key: string, value: any) => {
	if (browser) {
		localStorage.setItem(key, value);
	}
	return null;
};




