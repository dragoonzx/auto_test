import React, { useState, useEffect } from "react";
import "./styles.scss";
import bonus from "./plus.svg";
import success from "./success.svg";
import { useStore } from "../../store";

interface IOrganization {
	value: string;
	data?: any;
}

const Search: React.FC = () => {
	const [query, setQuery] = useState("");
	const [recommendations, setRecommendations] = useState();
	const [orgInfo, setOrgInfo] = useState<IOrganization>({
		value: ""
	});

	const [saved, setSaved] = useStore("saved");

	const handleQueryChange = (e: any) => {
		setQuery(e.target.value);
		setOrgInfo({ value: "" });
	};
	useEffect(() => {
		const fetchRecommendations = async () => {
			let fetchedData = await (
				await fetch(
					"https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
							Authorization: "Token 1182cca0a0b7557468200e79f0a94b60505b38a8"
						},
						body: JSON.stringify({ query })
					}
				)
			).json();
			setRecommendations(fetchedData.suggestions.slice(0, 6));
		};
		fetchRecommendations();
	}, [query]);

	const handleInfo = (orgData: any): any => {
		setOrgInfo(orgData);
		setQuery(orgData.value);
		setFlag(false);
	};
	const [flag, setFlag] = useState(false);
	const saveOrganization = () => {
		setSaved([orgInfo, ...saved]);
		setFlag(true);
	};
	return (
		<div className="content__wrapper">
			<h4 className="content__header__title">Организация или ИП</h4>
			<div className="search__field">
				<input
					type="text"
					placeholder="Введите название, ИНН или адрес организации"
					value={query}
					onChange={e => handleQueryChange(e)}
				></input>
			</div>

			<div className="helper__info">
				{query == "" && (
					<>
						<img src={bonus}></img>
						<h4>
							Для добавления новой организации<br></br>введите её название, ИНН
							или адрес.
						</h4>
					</>
				)}
				{query !== "" && orgInfo.value === "" ? (
					<div className="recommendations">
						{recommendations.map((data: any, index: number) => {
							let { value } = data;
							let { inn } = data.data;
							let { city_type, city } = data.data.address.data;
							return (
								<div
									key={index}
									className="recommendation"
									onClick={e => handleInfo(data)}
								>
									<h3>{value}</h3>
									<div style={{ display: "inline-flex" }}>
										<p style={{ margin: 0 }}>{inn}</p>
										<p style={{ margin: 0, paddingLeft: "32px" }}>
											{city_type} {city}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<div
						className={
							orgInfo.value === ""
								? "org__information--disabled"
								: "org__information"
						}
					>
						<h2>{orgInfo.value}</h2>
						<hr style={{ border: "1px solid #DFDFDF" }}></hr>
						{orgInfo.data !== undefined ? (
							<div
								style={{
									display: "inline-flex",
									width: "100%",
									justifyContent: "space-between"
								}}
							>
								<div className="main__org__info">
									<h4>Юридический адрес</h4>
									<p>{orgInfo.data.address.value}</p>
									<h4>Генеральный директор</h4>
									<p>
										{orgInfo.data.management === undefined
											? orgInfo.data.name.full
											: orgInfo.data.management.name}
									</p>
									<button
										onClick={saveOrganization}
										className={flag ? "button__save--disabled" : "button__save"}
									>
										Сохранить
									</button>
									<div className={flag ? "success" : "success--disabled"}>
										<span style={{ display: "inline-flex" }}>
											<img src={success} alt="success"></img>
											<h5 className="success__text">Сохранено</h5>
										</span>
									</div>
								</div>
								<div className="sub__org__info">
									<span style={{ display: "inline-flex" }}>
										<b>ИНН</b>
										<p style={{ margin: "0px", paddingLeft: "8px" }}>
											{orgInfo.data.inn}
										</p>
									</span>
									<span style={{ display: "inline-flex" }}>
										<b>КПП</b>
										<p style={{ margin: "0px", paddingLeft: "8px" }}>
											{orgInfo.data.kpp}
										</p>
									</span>
									<span style={{ display: "inline-flex" }}>
										<b>ОГРН</b>
										<p style={{ margin: "0px", paddingLeft: "8px" }}>
											{orgInfo.data.ogrn}
										</p>
									</span>
								</div>
							</div>
						) : (
							""
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Search;
