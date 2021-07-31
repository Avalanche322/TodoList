import { useContext } from "react";
import Context from "../../contexts/context";
import { ContextMenuTrigger } from "react-contextmenu";
import useCompletedTask from "../../customHooks/API/useCompletedTask";
import useGetDate from "../../customHooks/useGetDate";

const Task = ({task,page,setSelectTask}) => {
	const { setTaskEdit,setAddForm } = useContext(Context);
	const {completedTask} = useCompletedTask();
	const {today,converToFullDate} = useGetDate();
	const handelTaskEdit = () =>{
		setTaskEdit(task);
		setAddForm(false);
	}
	return (
		<li>
			<ContextMenuTrigger id="contextmenu" holdToDisplay={-1}>
				<div className="main__task" onContextMenu={() => setSelectTask(task)}>
					<div className="main__task-action">
						<button onClick={handelTaskEdit.bind(null)} className="far fa-edit main-task-action__btn"></button>
					</div>
					<input className={`main__checkbox priority-${task.priority}`} 
						type="checkbox"
						checked={task.completed}
						onChange={completedTask.bind(null,task)}/>
					<div>
						<p className={`main__text ${task.completed ? "completed" : ""}`}>{task.body}</p>
						{page === "Home" ? null : 
							<p className={new Date(task.date) < new Date(today()) ? "denger" : ''}>{converToFullDate(task.date)}</p>
						}
					</div>
				</div>
			</ContextMenuTrigger>
		</li>	
	);
}
 
export default Task;