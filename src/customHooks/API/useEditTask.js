import firebase from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import useEditTaskComment from "./useEditTaskComment";
import useAddTaskComment from "./useAddTaskComment";
import { useContext } from "react";
import Context from "../../contexts/context";

const useEditTask = () => {
	const {comments} = useContext(Context);
	const {currentUser} = useAuth();
	const {editTaskComment} = useEditTaskComment();
	const {addTaskComment} = useAddTaskComment();
	function editTask(body,date,priority,comment,task){
		const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`).child(task.id);
		const UpdateTask = {
			body,
			completed: false,
			date,
			priority
		}
		taskRef.update(UpdateTask);
		navigator.vibrate(10);
		comments.length ? editTaskComment(comment,task.id) : addTaskComment(comment.text,task.id);
	}
	return {editTask}
}
 
export default useEditTask;