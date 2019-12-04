import React from "react";
import "./styles.scss";

interface ITabProps {
	title?: string;
	active?: boolean;
	clickedOnTab?: any;
}

const Tab: React.FC<ITabProps> = ({
	children,
	title,
	active,
	clickedOnTab
}) => {
	return (
		<>
			<div className="tab" onClick={clickedOnTab}>
				<div className={active ? "tab__rectangle--active" : "tab__rectangle"}>
					<h3 className={active ? "tab__title--active" : "tab__title"}>
						{title}
					</h3>
				</div>
			</div>
		</>
	);
};

export default Tab;
