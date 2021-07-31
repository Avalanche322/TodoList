import { useState } from "react";
import firebase from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';

const useDeleteTask = () => {
	const {currentUser} = useAuth();
	const [error, setEroor] = useState('');
	function deleteTask(task){
		try{
			const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`).child(task.id);
			taskRef.remove();
		} catch(e){
			setEroor(e.message);
			alert(e.message)
		}
	}
	return {deleteTask,error}
}
 
export default useDeleteTask;