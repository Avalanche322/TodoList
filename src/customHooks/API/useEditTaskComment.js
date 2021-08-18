import firebase from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';

const useEditTaskComment = () => {
	const {currentUser} = useAuth();
	const comments = JSON.parse(localStorage.getItem('comments'));
	function editTaskComment(comment){
		const taskCommentRef = firebase.database().ref(`users/${currentUser.uid}/comments`).child(comment.id);
		const updateTaskComment = {
			date_posted: comment.date_posted,
			posted_uid: comment.posted_uid,
			text: comment.text
		}
		taskCommentRef.update(updateTaskComment);
		for (let i = 0; i < comments.length; i++) {
			if(comments[i].id === comment.id){
				comments.splice(i,1,comment);
			}
		}
		localStorage.setItem('comments', JSON.stringify(comments));
	}
	return {editTaskComment}
}
 
export default useEditTaskComment;