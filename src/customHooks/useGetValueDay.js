import { useState } from "react";
import useGetDate from "./useGetDate";

const useGetValueDay = () => {
	const {today, nextWeek, tommorow, nextWeekend} = useGetDate();
	const [isSelectDayOpen, setIsSelectDayOpen] = useState(false);
	const [date, setDate] = useState(today());
	const [isDay, setIsDay] = useState('Today');
	const [isDayClass, setIsDayClass] = useState('fas fa-calendar-week');
	const [isSelectDay] = useState ([
		{id:1, day:"Today", date:today(),classValue:"fas fa-calendar-week"},
		{id:2, day:"Tommorow", date:tommorow(),classValue:"fas fa-sun"},
		{id:3, day:"Next Weekend", date:nextWeekend(),classValue:"fas fa-couch"},
		{id:4, day:"Next Week", date:nextWeek(),classValue:"fas fa-fast-forward"},
		{id:5, day:"No date", date:'',classValue:"far fa-calendar-times"}
	])
	function handlerSelectValueDay(day,date,classValue){
		setIsDay(day);
		setIsDayClass(classValue);
		setDate(date);
		setIsSelectDayOpen(false);
	}
	return {
		date,
		isDayClass,
		isSelectDayOpen,
		isDay,
		isSelectDay,
		setIsSelectDayOpen: (val) => setIsSelectDayOpen(val),
		setDate: (val) => setDate(val),
		handlerSelectValueDay
	}
}
 
export default useGetValueDay;