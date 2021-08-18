import { useState } from "react";
import firebase from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import Context from "../../contexts/context";
import { useContext } from "react";

const useDeleteTaskComment = () => {
	const {currentUser} = useAuth();
	const [error, setEroor] = useState('');
	const {settings} = useContext(Context);
	function deleteTaskComment(comment){
		try{
			const taskCommentRef = firebase.database().ref(`users/${currentUser.uid}/comments`).child(comment.id);
			taskCommentRef.remove();
			if(settings.vibration) navigator.vibrate(30); // togle vibration
		} catch(e){
			setEroor(e.message);
			alert(e.message)
		}
	}
	return {deleteTaskComment,error}
}
 
export default useDeleteTaskComment;