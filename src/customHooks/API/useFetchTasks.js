import { useEffect, useState } from "react";
import firebase from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import useGetDate from "../useGetDate";

const useFetchTasks = () => {
	const {today,converToShortDate} = useGetDate();
	const {currentUser} = useAuth();
	const [taskListAll, setTaskListAll] = useState();
	const [taskListToday, setTaskListToday] = useState();
	const [taskNoCompleted,setTaskNoCompleted] = useState();
	const [loader, setLoader] = useState(true);
	const [error, setError] = useState('');
	
	useEffect(() =>{
		try{
			const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`);
			const listener = taskRef.on('value', (snapshot) =>{
				const tasks = snapshot.val();
				const taskListAll = [];
				for (const id in tasks) {
					taskListAll.push({id,...tasks[id]});
				}
				setTaskListAll(taskListAll);
				//localStorage.setItem('tasks', JSON.stringify(taskListAll));
				setTaskListToday(taskListAll.filter(t => converToShortDate(t.date) <= converToShortDate(today()) ));
				setTaskNoCompleted(taskListAll.filter(t => converToShortDate(t.date) < converToShortDate(today()) ))
				setLoader(false);
			})
			return () => taskRef.off('value', listener);
		} catch(e){
			setLoader(false);
			setError(e.message);
		}
	// eslint-disable-next-line
	},[])
	return {
		taskListAll,
		taskListToday,
		taskNoCompleted,
		loader,
		error
	}
}
 
export default useFetchTasks;