import { useHistory } from "react-router";

const Settings = () => {
	const history = useHistory();
	const back = e => {
		e.stopPropagation();
		history.goBack();
	};
	return (
		<div>
			<div className="settings" onClick={back}>
				<div className="settings__body" onClick={e => e.stopPropagation()}>
					<div className="settings__header">
						<h3 className="settings__title">Settings</h3>
						<span className="fas fa-times close" onClick={back}></span>
					</div>
				</div>
			</div>
		</div>
	);
}
 
export default Settings;