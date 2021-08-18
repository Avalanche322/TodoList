import { useState } from "react";
import firebase from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import useGetDate from "../useGetDate";

const useAddTaskComment = () => {
	const {currentUser} = useAuth();
	const settings = JSON.parse(localStorage.getItem('settings'));
	const comments = JSON.parse(localStorage.getItem('comments'));
	const {today} = useGetDate();
	const [error, setError] = useState();
	function addTaskComment(text,taskId){
		try{
			if(comments.length < 500){
				if(text){
					const taskCommentRef = firebase.database().ref(`users/${currentUser.uid}/comments`);
					const comment = {
						text,
						date_posted: today(),
						posted_uid: taskId
					}
					const commentRef = taskCommentRef.push(comment);
					comment.id = commentRef.key;
					comments.push(comment);
					localStorage.setItem('comments', JSON.stringify(comments));
					if(settings.vibration) navigator.vibrate(10); // togle vibration
				}
			} else{
				throw new Error('Limit comments is 500');
			}
		} catch(e){
			setError(e.message);
			alert(e.message);
		}
	}
	return {addTaskComment,error}
}
 
export default useAddTaskComment;