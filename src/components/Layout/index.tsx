import React from "react";
import logo from "./logo.svg";
import "./styles.scss";

const Layout: React.FC = ({ children }) => {
	return (
		<>
			<div className="header">
				<img alt="logo" className="header__image" src={logo}></img>
			</div>
			<div className="main__wrapper">
				<div className="main">
					<h1 style={{ paddingLeft: "8px" }}>Мои организации</h1>
					<div style={{ position: "relative" }}>{children}</div>
				</div>
			</div>
		</>
	);
};

export default Layout;
