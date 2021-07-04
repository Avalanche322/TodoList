import { useState,useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

const AddTask = () => {
	const [addForm, setAddForm] = useState(false);

	let selectDayRef = useRef();
	let selectPriorityRef = useRef();
	let selectCommentRef = useRef();
	return (
		<div className="main__add-task">
			{addForm && 
				<form className="main-add-task__form">
					<div className="main-add-task-form__edit">
						<TextareaAutosize 
							className="main-add-task-form__text" 
							maxRows="6" 
							minRows="1" 
							autoFocus 
							placeholder="Task name">
						</TextareaAutosize>
						<div className="main-add-task-form__bottom">
							<div ref={selectDayRef} className="main-add-task-form-day">
								<button 
									className={`main-add-task-form-day__btn`} 
									type="button">
								</button>
								<ul className={`main-add-task-form-day__list hidden`}>
									<li>
										<input 
											className="main-add-task-form-day__input" type="text"/>
									</li> 
									<li>
										<span className={`main-add-task-form-day__day`}></span> 
										<span className="main-add-task-form-day__date"></span>
									</li>				
								</ul>
							</div>
							<div className="main-add-task-form__group">
								<div ref={selectPriorityRef}  className="main-add-task-form-priority">
									<button 
										type="button"
										className={`main-add-task-form-priority__btn fas fa-flag`}>
									</button>
									<ul className={`main-add-task-form-priority__list hidden`}>
										<li className={`main-add-task-form-priority__item`}>
											<span className={`main-add-task-form-priority__priority fas fa-flag `}>Priority</span>
											<span className="main-add-task-form-priority__check check fas fa-check"></span> 
										</li>			
								</ul>
								</div>
								<div ref={selectCommentRef} className="main-add-task-form-comment">
									<button 
										type="button"
										className={`main-add-task-form-comment__btn far fa-comment-alt`}>
									</button>
									<div className={`main-add-task-form-comment__dialog hidden`}>
										<div className="main-add-task-form-comment__header">
											<h3 className="main-add-task-form-comment__title">Quick Comment</h3>
											<span className="fas fa-times main-add-task-form-comment__close close">
											</span>
										</div>
										<TextareaAutosize 
											className="main-add-task-form-comment__text" 
											maxRows="3" 
											minRows="1" 
											autoFocus 
											placeholder="Write a comment">
										</TextareaAutosize>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="main-add-task-form__action">
						<button 
							className="main-add-task-form__btn-submit btn-submit" 
							type="submit">
						Add task</button>
						<button className="main-add-task-form__btn-cancel btn-cancel" onClick={() => setAddForm(false)}>Cancel</button>
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