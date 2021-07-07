import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import firebase from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import Comment from "../Comment";
import Priority from "../Priority";
import Day from "../Day";
import useGetPriority from "../../customHooks/useGetPriority";
import useGetDay from "../../customHooks/useGetDay";
import useGetDate from "../../customHooks/useGetDate";

const AddTask = () => {
	/* Select day*/
	const {handlerDayOpen,handlerSelectValueDay,date,isDayClass,isSelectDayOpen,handlerSetDate,isDay,isSelectDay,} = useGetDay();	
	/* Select priority*/
	const {handlerSelectValuePriority,priority,isSelecPriority,isPriorityClass,handlerPriorityOpen,isSelectPriorityOpen,} = useGetPriority();
	/* Select comment*/
	const [comment, setComment] = useState('');
	function handlerSetComment(text) {
		setComment(text);
	}
	/*Common*/
	const {today} = useGetDate();
	const [addForm, setAddForm] = useState(false);
	const [body, setBody] = useState('');
	
	const {currentUser} = useAuth();
	function handlerDefault() {
		setBody('');
		handlerSelectValueDay('Today',today(),'fas fa-calendar-week');
		handlerSelectValuePriority('', 4);
		setComment('');
	}
	function handlerSubmit(e){
		e.preventDefault();
		const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`);
		const task = {
			body,
			completed: false,
			date,
			priority,
			comment
		}
		taskRef.push(task);
		handlerDefault();
	}
	return (
		<div className="main__add-task">
			{addForm && 
				<form className="main-add-task__form" onSubmit={handlerSubmit}>
					<div className="main-add-task-form__edit">
						<TextareaAutosize 
							className="main-add-task-form__text" 
							maxRows="6" 
							minRows="1" 
							autoFocus 
							placeholder="Task name"
							value={body}
							onChange={(e) => setBody(e.target.value)}>
						</TextareaAutosize>
						<div className="main-add-task-form__bottom">
							<Day
								handlerDayOpen={handlerDayOpen} 
								isDayClass={isDayClass} 
								isSelectDayOpen={isSelectDayOpen}
								isDay={isDay}
								date={date}
								handlerSetDate={handlerSetDate}
								isSelectDay={isSelectDay}
								handlerSelectValueDay={handlerSelectValueDay}/>
							<div className="main-add-task-form__group">
								<Priority 
									isSelecPriority={isSelecPriority} 
									isPriorityClass={isPriorityClass} 
									handlerSelectValuePriority={handlerSelectValuePriority}
									setIsSelectPriorityOpen={handlerPriorityOpen}
									isSelectPriorityOpen={isSelectPriorityOpen}/>
								<Comment comment={comment} setComment={handlerSetComment}/>
							</div>
						</div>
					</div>
					<div className="main-add-task-form__action">
						<button 
							className="main-add-task-form__btn-submit btn-submit" 
							type="submit"
							disabled={!body.trim()}>
						Add task</button>
						<button 
							className="main-add-task-form__btn-cancel btn-cancel"
							type="button"
							onClick={() =>{
								setAddForm(false);
								handlerDefault();}
							}>
						Cancel</button>
					</div>
				</form>
			}
			{!addForm && 
			<button 
				className="main-add-task__btn" 
				onClick={() => setAddForm(true)}>
				<i className="fas fa-plus"></i>
				<span>Add task</span>
			</button>}
		</div>
	);
}
 
export default AddTask;