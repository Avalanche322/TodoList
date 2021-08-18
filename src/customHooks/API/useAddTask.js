import { useState } from "react";
import firebase from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import useGetDate from "../useGetDate";
import useAddTaskComment from "./useAddTaskComment";
import useGetCountTasks from "../useGetCountTasks";
import Context from "../../contexts/context";
import { useContext } from "react";

const useAddTask = () => {
	const {settings} = useContext(Context);
	const {currentUser} = useAuth();
	const {today} = useGetDate();
	const {addTaskComment} = useAddTaskComment();
	const [error, setError] = useState();
	const {countTaskAll} = useGetCountTasks();
	function addTask(body,date,priority,comment){
		try{
			if(countTaskAll < 500){
				const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`);
				const task = {
					body,
					completed: false,
					date_added: today(),
					date,
					priority
				}
				const insertData = taskRef.push(task);
				if(settings.vibration) navigator.vibrate(10); // togle vibration
				addTaskComment(comment,insertData.key);
			} else{
				throw new Error('Limit task is 500');
			}
		} catch(e){
			setError(e.message);
			alert(e.message)
		}
	}
	return {addTask,error}
}
 
export default useAddTask;