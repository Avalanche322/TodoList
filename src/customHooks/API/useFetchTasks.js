import { useEffect, useState } from "react";
import firebase from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import useGetDate from "../useGetDate";

const useFetchTasks = () => {
	const {today} = useGetDate();
	const {currentUser} = useAuth();
	const [taskListAll, setTaskListAll] = useState();
	const [taskListToday, setTaskListToday] = useState();
	useEffect(() => {
		const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`);
		taskRef.on('value', (snapshot) =>{
			const tasks = snapshot.val();
			const taskListAll = [];
			for (const id in tasks) {
				taskListAll.push({id,...tasks[id]});
			}
			setTaskListAll(taskListAll);
			setTaskListToday(taskListAll.filter(t => t.date === today()));
		})
	}, [currentUser.uid])
	return {
		taskListAll,
		taskListToday,
	}
}
 
export default useFetchTasks;