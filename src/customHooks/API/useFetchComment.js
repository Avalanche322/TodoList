import { useState } from "react";
import firebase from "../../firebase";

const useFetchComment = () => {
	const [error, setError] = useState('');
	function fetchComment(user){
		try{
			const taskCommentRef = firebase.database().ref(`users/${user.uid}/comments`);
			const listener = taskCommentRef.once('value', (snapshot) =>{
				const tasks = snapshot.val();
				const taskCommentListAll = [];
				for (const id in tasks) {
					taskCommentListAll.push({id,...tasks[id]});
				}
				localStorage.setItem('comments', JSON.stringify(taskCommentListAll));
			})
			return () => taskCommentRef.off('value', listener);
		} catch(e){
			setError(e.message);
		}
	}
	return {
		fetchComment,
		error
	}
}
 
export default useFetchComment;