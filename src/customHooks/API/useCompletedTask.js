import { useState,useContext } from "react";
import firebase from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import useDeleteTask from './useDeleteTask';
import useGetDate from "../useGetDate";
import useDeleteTaskComment from "./useDeleteTaskComment";
import Context from "../../contexts/context";
import useAudio from "../useAudio";

const useCompletedTask = () => {
	const {currentUser} = useAuth();
	const {deleteTask} = useDeleteTask();
	const [error, setError] = useState('');
	const {converToShortDate} = useGetDate();
	const {settings,comments} = useContext(Context);
	const {deleteTaskComment} = useDeleteTaskComment();
	const {playAudio} = useAudio();
	
	async function handlerCountCompletedTask(){
		const stats = JSON.parse(localStorage.getItem('stats'));
		stats.days_items.total_completed++;
		stats.days_items.date = converToShortDate(new Date());
		stats.completed_count++;
		localStorage.setItem('stats', JSON.stringify(stats));
		const statsRef = firebase.database().ref(`users/${currentUser.uid}/stats`);
		await statsRef.update(stats)
	}

	function completedTask(task){
		try{
			const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`).child(task.id);
			taskRef.update({
				completed: !task.completed,
			});
			deleteTask(task);
			if(settings.vibration) navigator.vibrate(10); // togle vibration
			handlerCountCompletedTask(); // count completed task
			playAudio();
			for (const comment of comments) {
				if(comment.posted_uid === task.id){
					deleteTaskComment(comment);
				}
			}
						
		} catch(e){
			setError(e.message);
			alert(e.message);
		}
	}
	
	return {
		completedTask,
		error
	}
}
 
export default useCompletedTask;