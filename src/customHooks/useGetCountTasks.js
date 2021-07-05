import useFetchTasks from "./API/useFetchTasks";

const useGetCountTasks = () => {
	const {taskListAll,taskListToday} = useFetchTasks();
	let countTaskToday = 0;
	let countTaskAll = 0;
	if(taskListToday){
		countTaskToday = taskListToday.length;
	}
	if(taskListAll){
		countTaskAll = taskListAll.length;
	}
	return {
		countTaskToday,
		countTaskAll
	}
}
 
export default useGetCountTasks;