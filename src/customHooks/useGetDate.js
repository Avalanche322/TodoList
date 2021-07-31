import { useTranslation } from "react-i18next";
import moment from 'moment';
import 'moment-timezone';
import "moment/locale/en-gb";
import "moment/locale/uk";

const useGetDate = () => {
	const { t } = useTranslation();
	moment.locale("en-gb");
	let today = new Date();
	let tommorow = new Date();
	tommorow.setDate(tommorow.getDate() + 1);
	let nextWeek = new Date();
	nextWeek.setDate(nextWeek.getDate() + 7);
	let nextWeekend  = new Date();
	nextWeekend.setDate(nextWeekend.getDate() + (6 - 1 - nextWeekend.getDay() + 7) % 7 + 1);
	const converToFullDate = (dateString) => { // conver for user display date	
		if(dateString){
			moment.locale(t("locales"));
			return (moment(dateString, "DD/MM/YYYY").format('ll'))
		} else{
			return ""
		}
	}
	return {
		today : () => moment(today).format('L'),
		tommorow : () => moment(tommorow).format('L'),
		nextWeek : () => moment(nextWeek).format('L'),
		nextWeekend : () => moment(nextWeekend).format('L'),
		converToFullDate
	}
}
 
export default useGetDate;