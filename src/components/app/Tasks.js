import { useState, useContext } from "react";
import CustomContexMenu from "../CustomContexMenu";
import Edit from "./Edit";
import Task from "./Task";
import Context from "../../contexts/context";

const Tasks = ({tasks,page}) => {
	const [selectTask, setSelectTask] = useState();
	const { taskEdit } = useContext(Context);
	return (
		<ul className="main__tasks">
			{tasks.map(task =>{
				return (
					taskEdit.id !== task.id 
					? <Task task={task} key={task.id} page={page} setSelectTask={setSelectTask} /> 
					: <Edit key={task.id} />
				)
			})}		
			<CustomContexMenu selectTask={selectTask} />
		</ul>
	);
}
 
export default Tasks;