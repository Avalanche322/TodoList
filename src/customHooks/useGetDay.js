import { useState,useContext } from "react";
import useGetDate from "./useGetDate";
import Context from "../contexts/context";

const useGetDay = () => {
	const {settings} = useContext(Context);
	const [isSelectDayOpen, setIsSelectDayOpen] = useState(false);
	const {today, nextWeek, tomorrow, nextWeekend} = useGetDate();
	const [date, setDate] = useState(today());
	const [isDay, setIsDay] = useState('today');
	const [isDayClass, setIsDayClass] = useState('fas fa-calendar-week');
	const isSelectDay = [
		{id:1, day:"today", date:today(),classValue:"fas fa-calendar-week"},
		{id:2, day:"tomorrow", date:tomorrow(),classValue:"fas fa-sun"},
		{id:3, day:"nextWeekend", date:nextWeekend(),classValue:"fas fa-couch"},
		{id:4, day:"nextWeek", date:nextWeek(),classValue:"fas fa-fast-forward"},
		{id:5, day:"noDate", date:'',classValue:"far fa-calendar-times"}
	]
	function handlerSelectValueDay(day,date,classValue,setDateEdit = setDate){ // setDateEdit it's setState date from edit to change local state
		setIsDay(day);
		setIsDayClass(classValue);
		setDateEdit(date);
		setIsSelectDayOpen(false);
		if(settings.vibration) navigator.vibrate(8); // togle vibration
	}
	function handlerSetDate(day){
		setDate(day);
	}
	return {
		handlerSelectValueDay,
		date,
		isDayClass,
		isSelectDayOpen,
		handlerSetDate,
		isDay,
		isSelectDay,
		setIsDay,
		setIsDayClass,
		setIsSelectDayOpen
	}
}
 
export default useGetDay;