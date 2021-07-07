import { useEffect, useState, React, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import firebase from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import Comment from "../Comment";
import Priority from "../Priority";
import Day from "../Day";
import useGetPriority from "../../customHooks/useGetPriority";
import useGetDay from "../../customHooks/useGetDay";
import useGetDate from "../../customHooks/useGetDate";

const QuickAddTask = ({isOpen, handlerIsOpen}) => {
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
	const [body, setBody] = useState('');
	let quickAddTasRef = useRef();
	
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
		handlerIsOpen(false);
		handlerDefault();
	}
	useEffect(() =>{
		if(isOpen){
			let hendler = (event) =>{
				if(!quickAddTasRef.current.contains(event.target)){
					handlerIsOpen(false);
				}
			}
			document.addEventListener("mousedown", hendler)
			return () =>{
				document.removeEventListener("mousedown", hendler)
			}
		}
	})
	return (
		<div>
			{isOpen &&
				<div className="quick-add">
					<div ref={quickAddTasRef} className="quick-add__body">
						<div className="quick-add__header">
							<h3 className="quick-add__title">Quick Add Task</h3>
							<span className="fas fa-times quick-add__close close" onClick={() =>{
								handlerIsOpen(false);
								handlerDefault();
							}}>
							</span>
						</div>
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
									disabled={!body.trim()}
									type="submit">
								Add task</button>
							</div>
						</form>
					</div>
				</div>
			}
		</div>
	);
}
 
export default QuickAddTask;