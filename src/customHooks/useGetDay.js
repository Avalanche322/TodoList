import { useState } from "react";
import useGetDate from "./useGetDate";

const useGetDay = () => {
	const [isSelectDayOpen, setIsSelectDayOpen] = useState(false);
	const {today, nextWeek, tommorow, nextWeekend} = useGetDate();
	const [date, setDate] = useState(today());
	const [isDay, setIsDay] = useState('today');
	const [isDayClass, setIsDayClass] = useState('fas fa-calendar-week');
	const [isSelectDay] = useState ([
		{id:1, day:"today", date:today(),classValue:"fas fa-calendar-week"},
		{id:2, day:"tommorow", date:tommorow(),classValue:"fas fa-sun"},
		{id:3, day:"nextWeekend", date:nextWeekend(),classValue:"fas fa-couch"},
		{id:4, day:"nextWeek", date:nextWeek(),classValue:"fas fa-fast-forward"},
		{id:5, day:"noDate", date:'',classValue:"far fa-calendar-times"}
	])
	function handlerSelectValueDay(day,date,classValue){
		setIsDay(day);
		setIsDayClass(classValue);
		setDate(date);
		setIsSelectDayOpen(false);
	}
	function handlerDayOpen(val){
		setIsSelectDayOpen(val);
	}
	function handlerSetDate(day){
		setDate(day);
	}
	return {
		handlerDayOpen,
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