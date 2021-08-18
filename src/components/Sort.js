import { useState,useEffect, useRef, memo } from "react";
import { useTranslation } from "react-i18next";
import Context from "../contexts/context";
import { useContext } from "react";
import { useAuth } from "../contexts/AuthContext";

const Sort = ({selectItemSort,setSelectItemSort,project}) => {
	const {settings} = useContext(Context);
	const {updateSort} = useAuth();
	const [isSortOpen, setIsSortOpen] = useState(false);
	const {t} = useTranslation();
	const sortyRef = useRef();
	const sortItem = [
		{id:0, name: "sortByDate", classValue: "fas fa-calendar-week", sorted_by: 'date'},
		{id:1, name: "sortByPriority", classValue: "fas fa-flag", sorted_by: 'priority'},
		{id:2, name: "sortByAlphabetically", classValue: "fas fa-font", sorted_by: 'alphabetically'}
	];
	useEffect(() =>{		
		let hendler = (event) =>{
			if(!sortyRef.current.contains(event.target)){
				setIsSortOpen(false);
			}
		}
		document.addEventListener("mousedown", hendler)
		return () =>{
			document.removeEventListener("mousedown", hendler)
		};	
	});

	function handlerSetSelectedItem(item){
		const obj = {
			...selectItemSort,
			[project]: {sort_order: 'desc', sorted_by: item.sorted_by}
		}
		setSelectItemSort(obj);
		updateSort(obj);
		setIsSortOpen(false);
		if(settings.vibration) navigator.vibrate(8); // togle vibration
	}
	function handlerIsActive(){
		setIsSortOpen(!isSortOpen);
		if(settings.vibration) navigator.vibrate(15); // togle vibration
	}
	return (
		<div ref={sortyRef} className="main-sort">
			<button type="button" className="fas fa-sort main-sort__btn" onClick={handlerIsActive.bind(null)}>{t("sort")}</button>
			<ul className={`main-sort__list ${isSortOpen ? "open" : "hidden"}`}>
				{sortItem.map(item =>{
					return(
						<li className={`main-sort__item ${item.sorted_by === selectItemSort[project]?.sorted_by ? 'focus' : ''}`} key={item.id} onClick={handlerSetSelectedItem.bind(null,item)}>
							<span className={`main-sort__name ${item.classValue}`}>{t(item.name)}</span>
							{ item.sorted_by === selectItemSort[project]?.sorted_by ? <span className="check fas fa-check"></span> : null}
						</li>
					)
				})}
			</ul>
		</div>
	);
}
 
export default memo(Sort);