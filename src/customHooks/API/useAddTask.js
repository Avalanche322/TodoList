import firebase from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';

const useAddTask = () => {
	const {currentUser} = useAuth();
	function addTask(body,date,priority,comment){
		const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`);
		const task = {
			body,
			completed: false,
			date,
			priority,
			comment
		}
		taskRef.push(task);
		
	}
	return {addTask}
}
 
export default useAddTask;