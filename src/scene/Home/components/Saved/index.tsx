import React, { useState } from "react";
import "./styles.scss";
import trash from "./trash.svg";
import arrow from "./arrow.svg";
import arrowup from "./arrowup.svg";
import { useStore } from "../../store";

const Saved: React.FC = () => {
	const [saved, setSaved] = useStore("saved");
	const deleteSaved = (data: any) => {
		alert("Вы уверены, что хотите удалить организацию?");
		let filteredSaved = saved.filter((elem: any) => elem.value !== data.value);
		setSaved(filteredSaved);
	};
	const [flag, setFlags] = useState(Array(saved.length).fill(false));
	const showMore = (id: any) => {
		let flags: any = [...flag];
		let flagId = flags[id];
		flagId = !flagId;
		flags[id] = flagId;
		setFlags(flags);
	};
	return (
		<div
			className="saved__wrapper"
			style={saved.length >= 3 ? { overflow: "scroll", width: "754px" } : {}}
		>
			<div className="organizations">
				{saved.map((data: any, id: number) => {
					return (
						<div className="organization--saved" key={id}>
							<div className="org__info--less">
								<h2>{data.value}</h2>
								<p style={{ display: "inline-flex" }}>
									ИНН{" "}
									<span style={{ paddingLeft: "8px", color: "#2B2829" }}>
										{data.data.inn}
									</span>
								</p>
								{flag[id] && (
									<>
										<p>
											КПП{" "}
											<span style={{ paddingLeft: "8px", color: "#2B2829" }}>
												{data.data.kpp}
											</span>
										</p>
										<p>
											ОГРН{" "}
											<span style={{ paddingLeft: "8px", color: "#2B2829" }}>
												{data.data.ogrn}
											</span>
										</p>
										<p>
											Юридический адрес{" "}
											<span style={{ paddingLeft: "8px", color: "#2B2829" }}>
												{data.data.address.value}
											</span>
										</p>
										<p>
											Генеральный директор{" "}
											<span style={{ paddingLeft: "8px", color: "#2B2829" }}>
												{data.data.management === undefined
													? data.data.name.full
													: data.data.management.name}
											</span>
										</p>
									</>
								)}
							</div>
							<div className="org__info--more">
								<img
									onClick={e => deleteSaved(data)}
									style={{
										padding: "8px",
										cursor: "pointer",
										paddingRight: "0px"
									}}
									src={trash}
									alt="delete"
								></img>
								{flag[id] !== true ? (
									<>
										<p
											style={{ cursor: "pointer" }}
											onClick={e => showMore(id)}
										>
											подробнее <img src={arrow}></img>
										</p>
									</>
								) : (
									<>
										<p
											style={{ cursor: "pointer" }}
											onClick={e => showMore(id)}
										>
											скрыть подробности <img src={arrowup}></img>
										</p>
									</>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default Saved;
