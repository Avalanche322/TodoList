import firebase from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';

const useEditTask = () => {
	const {currentUser} = useAuth();
	function editTask(body,date,priority,comment,task){
		const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`).child(task.id);
		const UpdateTask = {
			body,
			completed: false,
			date,
			priority,
			comment
		}
		taskRef.update(UpdateTask);
		
	}
	return {editTask}
}
 
export default useEditTask;