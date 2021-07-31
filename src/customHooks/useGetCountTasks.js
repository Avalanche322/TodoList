import useFetchTasks from "./API/useFetchTasks";
import firebase from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import useGetDate from "./useGetDate";

const useGetCountTasks = () => {
	const {taskListAll,taskListToday,taskNoCompleted} = useFetchTasks();
	const {currentUser} = useAuth();
	const {today} = useGetDate();
	let countTaskToday = 0;
	let countTaskAll = 0;
	let countTaskNoCompleted = 0;
	if(taskListToday){// wait when task loading
		countTaskToday = taskListToday.length;
	}
	if(taskListAll){// wait when task loading
		countTaskAll = taskListAll.length;
	}
	if(taskNoCompleted){
		countTaskNoCompleted = taskNoCompleted.length;
	}
	async function handelCountCompletedTask(){
		const stats = JSON.parse(localStorage.getItem('stats'));
		stats.days_items.total_completed++;
		stats.days_items.date = today();
		stats.completed_count++;
		localStorage.setItem('stats', JSON.stringify(stats));
		const statsDaysItemsRef = firebase.database().ref(`users/${currentUser.uid}/stats/days_items`);
		const statsRef = firebase.database().ref(`users/${currentUser.uid}/stats`);
		await statsDaysItemsRef.update({
			total_completed: stats.days_items.total_completed
		})
		await statsRef.update({
			completed_count: stats.completed_count
		})
	}
	return {
		countTaskToday,
		countTaskAll,
		countTaskNoCompleted,
		handelCountCompletedTask
	}
}
 
export default useGetCountTasks;