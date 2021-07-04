const useGetDate = () => {
	const DATE_OPTIONS = { weekday: 'short', day: 'numeric', month: 'short' };
	let today = new Date();
	let tommorow = new Date();
	tommorow.setDate(tommorow.getDate() + 1);
	let nextWeek = new Date();
	nextWeek.setDate(nextWeek.getDate() + 7);
	let nextWeekend  = new Date();
	nextWeekend.setDate(nextWeekend.getDate() + (6 - 1 - nextWeekend.getDay() + 7) % 7 + 1);
	return {
		today : () => today.toLocaleDateString('en-UK', DATE_OPTIONS).replace(/,/, ''),
		tommorow : () => tommorow.toLocaleDateString('en-UK', DATE_OPTIONS).replace(/,/, ''),
		nextWeek : () => nextWeek.toLocaleDateString('en-UK', DATE_OPTIONS).replace(/,/, ''),
		nextWeekend : () => nextWeekend.toLocaleDateString('en-UK', DATE_OPTIONS).replace(/,/, ''),
	}
}
 
export default useGetDate;