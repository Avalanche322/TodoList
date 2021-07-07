import { useEffect, useState } from "react";
import firebase from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import useGetDate from "../useGetDate";

const useFetchTasks = () => {
	const {today} = useGetDate();
	const {currentUser} = useAuth();
	const [taskListAll, setTaskListAll] = useState();
	const [taskListToday, setTaskListToday] = useState();
	const [loader, setLoader] = useState(true);
	const [error, setEroor] = useState('');
	useEffect(() => {		
		try{
			const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`);
			const listener = taskRef.on('value', (snapshot) =>{
				const tasks = snapshot.val();
				const taskListAll = [];
				for (const id in tasks) {
					taskListAll.push({id,...tasks[id]});
				}
				setTaskListAll(taskListAll);
				setTaskListToday(taskListAll.filter(t => t.date === today()));
				setLoader(false);
			})
			console.log('e');
			return () => taskRef.off('value', listener);
		} catch(e){
			setLoader(false);
			setEroor(e.message);
		}
	}, [])
	return {
		taskListAll,
		taskListToday,
		loader,
		error
	}
}
 
export default useFetchTasks;