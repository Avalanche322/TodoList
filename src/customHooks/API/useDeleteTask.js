import { useState } from "react";
import firebase from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import useDeleteTaskComment from "./useDeleteTaskComment";
import Context from "../../contexts/context";
import { useContext } from "react";

const useDeleteTask = () => {
	const {currentUser} = useAuth();
	const [error, setEroor] = useState('');
	const {deleteTaskComment} = useDeleteTaskComment();
	const {settings,comments} = useContext(Context);
	function deleteTask(task){
		try{
			const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`).child(task.id);
			taskRef.remove();
			for (const comment of comments) {
				if(comment.posted_uid === task.id){
					deleteTaskComment(comment)
				}
			}
			if(settings.vibration) navigator.vibrate(30); // togle vibration
		} catch(e){
			setEroor(e.message);
			alert(e.message)
		}
	}
	return {deleteTask,error}
}
 
export default useDeleteTask;