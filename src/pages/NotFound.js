import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="not-found">
    		<div className="not-found__code">
				 	<span>4</span>
					<span className="far fa-question-circle fa-spin"></span>
					<span>4</span>
			 </div>
    		<div className="not-found__text">
				Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?
				<p>Let's go <Link to="/" className="btn-cancel">home</Link> and try from there.</p>
			</div>
      </div>
	);
}
 
export default NotFound;