import Tasks from "../components/app/Tasks";
import AddTask from "../components/app/AddTask";
import useGetDate from "../customHooks/useGetDate";
import { useEffect, useState } from "react";
import firebase from "../firebase";
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
	const {today} = useGetDate();
	const {currentUser} = useAuth();
	const [taskList, setTaskList] = useState();
	useEffect(() => {
		// title for page
		document.title = "Home | TodoList"

		const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`);
		taskRef.on('value', (snapshot) =>{
			const tasks = snapshot.val();
			const taskList = [];
			for (const id in tasks) {
				taskList.push({id,...tasks[id]});
			}
			setTaskList(taskList);
		})
	}, [currentUser.uid])
	return (
		<main className="main">
			<div className="main__content container">
				<div className="main__header">
					<h1 className="main__title">
						<span>Today</span>
						<small>{today()}</small>
					</h1>
				</div>
				{taskList && <Tasks tasks={taskList}/>}
				<AddTask/>
			</div>
		</main>
	);
}
 
export default Home;