import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

const ChangeEmail = ({close,back}) => {
	const {currentUser,changeEmail,error:err} = useAuth();
	const [isShowPassword, setIsShowPassword] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState(err);
	const [loading, setLoading] = useState(false);
	const [newEmail, setNewEmail] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const { t } = useTranslation();
	useEffect(() => {
		// title for page
		document.title = `${t("changeEmailAddress")} - ${t("settings")} | TodoList`;
	// eslint-disable-next-line
	}, [])
	async function handleSubmit(e){
		e.preventDefault();
		setMessage("");
		setError("");
		try{
			setLoading(true);
			await changeEmail(currentPassword,newEmail);
			setNewEmail("");
			setCurrentPassword("");
			setMessage("Your email change success");
		} catch(e){
			setLoading(true);
			setError(e.message);
			setMessage("");
		} finally{
			setLoading(false);
		}
	}
	return (
		<form onSubmit={handleSubmit} className="settings__form">
			<header className="settings__header">
				<span className="fas fa-arrow-left back" onClick={back}></span>
				<h2 className="settings__title">{t("changeEmailAddress")}</h2>
				<span className="fas fa-times close" onClick={close}></span>
			</header>
			<div className="settings__email settings__container">
				<div className="settings__block">
					<p className="settings__text">{t("changeEmailAddressText")} <span>{currentUser.email}</span>.</p>
				</div>
				<div className="settings__block">
					<h3 className="settings__subtitle">{t("newEmail")}</h3>
					<div className="settings__group">
						<div className="input settings__input">
							<input 
								value={newEmail}
								onChange={(e) => {
									setNewEmail(e.target.value);
									setError("");
									setMessage("");
								}}
								type="email"
								name="email" 
								id="email"/>
						</div>
					</div>
				</div>
				<div className="settings__block">	
					<div className="settings__group-title">
						<h3 className="settings__subtitle">{t("todoListPassword")}</h3>
						<Link to="/forgotPassword" target="_blank" className="link-reset-password">{t("ForgotPassword")}</Link>
					</div>
					<div className="settings__group">
						<div className="input settings__input">
							<input 
								value={currentPassword}
								onChange={(e) => {
									setCurrentPassword(e.target.value);
									setError("");
									setMessage("");
								}}
								type={isShowPassword ? "text" : "password"}
								name="password" 
								id="password"/>
								<button 
									type="button" 
									className={`${isShowPassword ? "far fa-eye" : "far fa-eye-slash"} btn-password`}
									onClick={setIsShowPassword.bind(null,!isShowPassword)}></button>
						</div>
					</div>
				</div>
				<div className="settings__block">
					{error && <strong className="fas fa-exclamation-circle denger">{error}</strong>}
					{message && <strong className="fas fa-exclamation-circle success">{message}</strong>}
				</div>
			</div>
			<footer className="settings__footer">
				<button className="btn-cancel" type="button" onClick={back}>{t("cancel")}</button>
				<button 
					className="btn-submit settings-footer__btn-submit" 
					type="submit" 
					disabled={!currentPassword || !newEmail || loading}>
				{t("changeEmail")}</button>
			</footer>
		</form>
	);
}
 
export default ChangeEmail;