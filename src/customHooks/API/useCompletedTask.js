import firebase from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import useDeleteTask from './useDeleteTask';
import { useState } from "react";
import useGetCountTasks from "../useGetCountTasks";

const useCompletedTask = () => {
	const {currentUser} = useAuth();
	const {deleteTask} = useDeleteTask();
	const [error, setError] = useState('');
	const {handelCountCompletedTask} = useGetCountTasks();

	function completedTask(task){
		try{
			const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`).child(task.id);
			taskRef.update({
				completed: !task.completed,
			});
			deleteTask(task);
			handelCountCompletedTask();
		} catch(e){
			setError(e.message);
			alert(e.message);
		}
	}
	
	return {
		completedTask,
		error
	}
}
 
export default useCompletedTask;