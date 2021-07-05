import { useState } from "react";
import { ContextMenuTrigger } from "react-contextmenu";
import CustomContexMenu from "../CustomContexMenu";
import useCompletedTask from "../../customHooks/API/useCompletedTask";
const Tasks = ({tasks}) => {
	const {completedTask} = useCompletedTask();
	const [id, setId] = useState(); // this id for context menu
	return (
		<ul className="main__tasks">
			{tasks.map(task =>{
				return (
					<li key={task.id}>
						<ContextMenuTrigger id="contextmenu" holdToDisplay={-1}>
							<div className="main__task" onContextMenu={() => setId(task.id)}>
								<input className={`main__checkbox priority-${task.priority}`} 
									type="checkbox"
									onChange={completedTask.bind(null, task.id)}
								/>
								<div>
									<p className="main__text">{task.body}</p>
								</div>
							</div>
						</ContextMenuTrigger>
					</li>	
				)
			})}
			<CustomContexMenu taskId={id} />
		</ul>
	);
}
 
export default Tasks;