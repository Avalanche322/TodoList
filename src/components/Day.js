import { useRef, useEffect, useState } from "react";
import { useTranslation,Trans } from "react-i18next";
import useGetDate from "../customHooks/useGetDate";
import moment from 'moment';

const Day = ({handlerDayOpen,isDayClass,isSelectDayOpen,isDay,handlerSetDate,isSelectDay,handlerSelectValueDay,date}) => {
	let selectDayRef = useRef();
	const {converToFullDate,today,tommorow,nextWeek,nextWeekend} = useGetDate();
	const { t } = useTranslation();
	const [isInputDate, setIsInputDate] = useState(false);
	const [inputDate, setInputDate] = useState(date);
	useEffect(() =>{		
		let hendler = (event) =>{
			if(!selectDayRef.current.contains(event.target)){
				handlerDayOpen(false);
			}
		}
		document.addEventListener("mousedown", hendler)
		return () =>{
			document.removeEventListener("mousedown", hendler)
		};	
	});
	function handelInputDate(date){
		setIsInputDate(true);
		if(date === ""){
			setIsInputDate(false);
		}
		if(date === "tomorrow" || date === "завтра"){
			setInputDate(tommorow());
		} else if(date === "today" || date === "сьогодні"){
			setInputDate(today());
		} else if(date === "weekends" || date === "вихідні"){
			setInputDate(nextWeekend());
		} else if(date === "next week" || date === "наступний тиждень"){
			setInputDate(nextWeek());
		} else{
			setInputDate(date);
			//handlerSetDate(date);
		}
	}
	function handelInputDateSubmit(){
		handlerSetDate(moment(inputDate, "DD/MM/YYYY").format('L'));
		handlerDayOpen(false);
	}
	return (
		<div ref={selectDayRef} className="main-editor-task-form-day">
			<button 
				className={`main-editor-task-form-day__btn ${isDayClass}`} 
				type="button"
				onClick={handlerDayOpen.bind(null,!isSelectDayOpen)}>
			{t(isDay)}
			</button>
			<ul className={`main-editor-task-form-day__list ${isSelectDayOpen ? "open" : "hidden"}`}>
				<li>
					<input 
						defaultValue={converToFullDate(inputDate)}
						className="main-editor-task-form-day__input" 
						type="text"
						onChange={(e) => handelInputDate(e.target.value)}/>
				</li>
				{isInputDate && (converToFullDate(inputDate) !== "Invalid date") && <li className="main-editor-task-form-day__moment">
					<p className="main-editor-task-form-day__input-text">{t("didYouMean")}
					<span onClick={handelInputDateSubmit.bind(null)}>{converToFullDate(inputDate)}</span> ?</p>
					<p className="main-editor-task-form-day__input-subtext">
						<Trans i18nKey="inputDateInfo">
							You can also type in recurring due dates like <span>today</span>, <span>tommorow</span>,<span>next week</span>, and <span>weekends</span>.
						</Trans></p>
				</li>}
				{isSelectDay.map(selectDay =>{
					return (
						<li 
							style={selectDay.day === isDay ? {display:'none'} : {}}
							onClick={handlerSelectValueDay.bind(null,selectDay.day,selectDay.date,selectDay.classValue)}	
							key={selectDay.id}>
							<span className={`main-editor-task-form-day__day ${selectDay.classValue}`}>{t(selectDay.day)}</span> 
							<span className="main-editor-task-form-day__date">{converToFullDate(selectDay.date)}</span>
						</li>)
				})}			
			</ul>
		</div>
	);
}
 
export default Day;