import React, { useState } from "react";
import Search from "./components/Search/index";
import Saved from "./components/Saved/index";
import Layout from "../../components/Layout/index";
import Tab from "../../components/Tab/index";

import { createStore, useStore } from "./store";

createStore({
	name: "saved",
	initialState: []
});

const Home: React.FC = () => {
	const [saved] = useStore("saved");
	const [activeTabs, setActiveTabs] = useState({
		tabNew: true,
		tabSaved: false
	});

	const handleNewTab = () => {
		setActiveTabs({ tabNew: true, tabSaved: false });
	};
	const handleSavedTab = () => {
		setActiveTabs({ tabNew: false, tabSaved: true });
	};

	return (
		<Layout>
			{/** TABS */}
			<Tab
				title="Новая организация"
				clickedOnTab={handleNewTab}
				active={activeTabs.tabNew}
			/>
			<Tab
				title={`Сохраненные организации (${saved.length})`}
				clickedOnTab={handleSavedTab}
				active={activeTabs.tabSaved}
			/>
			{/** TABS CONTENT */}
			{activeTabs.tabNew && <Search />}
			{activeTabs.tabSaved && <Saved />}
		</Layout>
	);
};

export default Home;
