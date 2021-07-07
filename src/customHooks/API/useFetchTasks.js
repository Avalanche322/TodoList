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
				taskRef.on('value', (snapshot) =>{
					const tasks = snapshot.val();
					const taskListAll = [];
					for (const id in tasks) {
						taskListAll.push({id,...tasks[id]});
					}
					setTaskListAll(taskListAll);
					setTaskListToday(taskListAll.filter(t => t.date === today()));
					setLoader(false);
				})
			} catch(e){
				setLoader(false);
				setEroor(e.message);
			}
		console.log('no');
	}, [])
	return {
		taskListAll,
		taskListToday,
		loader,
		error
	}
}
 
export default useFetchTasks;