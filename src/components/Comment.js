import { useState, useRef,useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

const Comment = ({comment, setComment}) => {
	const [isSelectCommentOpen, setIsSelectCommentOpen] = useState(false);
	let selectCommentRef = useRef();
	useEffect(() =>{		
		let hendler = (event) =>{
			if(!selectCommentRef.current.contains(event.target)){
				setIsSelectCommentOpen(false);
			}
		}
		document.addEventListener("mousedown", hendler)
		return () =>{
			document.removeEventListener("mousedown", hendler)
		};	
	});
	return (
		<div ref={selectCommentRef} className="main-add-task-form-comment">
			<button 
				type="button"
				data-tip="Add a comment"
				className={`main-add-task-form-comment__btn ${comment.length > 0 ? 'fas' : 'far'} fa-comment-alt`}
				onClick={() => setIsSelectCommentOpen(!isSelectCommentOpen)}>		
			</button>
			<div className={`main-add-task-form-comment__dialog ${isSelectCommentOpen ? "open" : "hidden"}`}>
				<div className="main-add-task-form-comment__header">
					<h3 className="main-add-task-form-comment__title">Quick Comment</h3>
					<span 
						className="fas fa-times main-add-task-form-comment__close close" 
						onClick={() => setIsSelectCommentOpen(false)}>
					</span>
				</div>
				<TextareaAutosize 
					className="main-add-task-form-comment__text" 
					maxRows="3" 
					minRows="1" 
					autoFocus 
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder="Write a comment">
				</TextareaAutosize>
			</div>
		</div>
	);
}
 
export default Comment;