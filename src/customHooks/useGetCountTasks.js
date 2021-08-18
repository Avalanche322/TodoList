import useFetchTasks from "./API/useFetchTasks";

const useGetCountTasks = () => {
	const {taskListAll,taskListToday,taskNoCompleted} = useFetchTasks();
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
	return {
		countTaskToday,
		countTaskAll,
		countTaskNoCompleted
	}
}
 
export default useGetCountTasks;