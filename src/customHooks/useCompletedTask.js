import firebase from "../firebase";
import { useAuth } from '../contexts/AuthContext';

const useCompletedTask = () => {
	const {currentUser} = useAuth();
	function completedTask(id){
		const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`).child(id);
		taskRef.remove();
	}
	return {completedTask}
}
 
export default useCompletedTask;