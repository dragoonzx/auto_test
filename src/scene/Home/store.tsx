import React, { useEffect, useState } from "react";

const defaultStoreName = "store";
const stores: any = {};

export const createStore = ({ name = defaultStoreName, ...config }) => {
	let state = config.initialState || {};
	let subscriptions: any[] = [];

	stores[name] = {
		setState: (updater: any) => {
			state = typeof updater === "function" ? updater(state) : updater;
			subscriptions.forEach(sub => sub(state));
		},
		getState() {
			return state;
		},
		subscribe(updater: any) {
			subscriptions.push(updater);
		},
		unsubscribe(updater: any) {
			subscriptions = subscriptions.filter(sub => sub !== updater);
		}
	};
};

export const useStore = (name = defaultStoreName) => {
	const store = stores[name];

	const [state, setState] = useState(store.getState());

	useEffect(() => {
		store.subscribe(setState);

		return () => store.unsubscribe(setState);
	}, []);

	return [state, store.setState];
};
