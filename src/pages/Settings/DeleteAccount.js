import { useState,useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import { useHistory } from "react-router";

const DeleteAccount = ({close,back}) => {
	const history = useHistory();
	const {deleteAccount,error: err} = useAuth();
	const [error, setError] = useState(err);
	const [loading, setLoading] = useState(false);
	const [isShowPassword, setIsShowPassword] = useState(false);
	const [currentPassword, setCurrentPassword] = useState("");
	const { t } = useTranslation();
	useEffect(() => {
		// title for page
		document.title = `${t("deleteAccount")} - ${t("settings")} | TodoList`;
	// eslint-disable-next-line
	}, [])
	async function handleSubmit(e){
		e.preventDefault();
		try{
			setLoading(true);
			await deleteAccount(currentPassword);
			setCurrentPassword("");
			setError("");
			history.push('/singin');
		} catch(e){
			setLoading(false);
			setError(e.message);
		}
	}
	return (
		<form onSubmit={handleSubmit} className="settings__form">
			<header className="settings__header">
				<span className="fas fa-arrow-left back" onClick={back}></span>
				<h2 className="settings__title">{t("deleteAccount")}</h2>
				<span className="fas fa-times close" onClick={close}></span>
			</header>
			<div className="settings__delete settings__container">
				<div className="settings__block">
					<p className="settings__text">{t("sadFarewell")}</p>
				</div>
				<div className="settings__block">
					<p className="settings__text">
						<Trans i18nKey="deleteAccountWarning">
							Deleting your account is permanent. <span>All your data will be wiped out immediately</span> and you won't be able to get it back.
						</Trans>
					</p>
				</div>
				<div className="settings__block">
					<h3 className="settings__subtitle">{t("todoListPassword")}</h3>
					<div className="settings__group">
						<div className="input settings__input">
							<input 
								value={currentPassword}
								onChange={(e) => setCurrentPassword(e.target.value)}
								type={isShowPassword ? "text" : "password"}
								name="password" 
								id="password"/>
								<button 
									type="button" 
									className={`${isShowPassword ? "far fa-eye" : "far fa-eye-slash"} btn-password`}
									onClick={setIsShowPassword.bind(null,!isShowPassword)}></button>
						</div>
					</div>
					<div className="settings__group settings-delete__group">
						<p className="settings__subtext">{t("deleteAccountWarning2")}</p>
					</div>
				</div>
				<div className="settings__block">
					{error && <strong className="fas fa-exclamation-circle denger">{error}</strong>}
				</div>
			</div>
			<footer className="settings__footer">
				<button className="btn-cancel" type="button" onClick={back}>{t("cancel")}</button>
				<button 
					className="btn-red settings-footer__btn-submit" 
					type="submit" 
					disabled={!currentPassword || loading}>
				{t("permanentlyDeleteAccount")}</button>
			</footer>
		</form>
	);
}
 
export default DeleteAccount;