import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import profileImg from "../../img/user2.png";
import googleIcon from "../../img/google-icon.png";
import { useTranslation, Trans } from "react-i18next";

const Account = ({close,handelActiveSidebar}) => {
	const {currentUser,changeName,uploadAvatar,removeAvatar,error:err,LinkInGoogle,isProviderPasswordUser,isProviderGoogle,unlinkGoogle,googleAccount} 
	= useAuth();
	const [userAvatar, setUserAvatar] = useState(currentUser.photoURL);
	const [userName, setUserName] = useState(currentUser.displayName);
	const [isUploadPhoto, setIsUploadPhoto] = useState(false);
	const [loading,setLoading] = useState(false);
	const [error, setError] = useState(err);
	const [isUpdate, setIsUpdate] = useState(false);
	const [isGoogleProvider, setIsGoogleProvider] = useState();
	const [isPasswordProvider, setIsPasswordProvider] = useState();
	const { t } = useTranslation();
	useEffect(() => {
		// title for page
		document.title = `${t("account")} - ${t("settings")} | TodoList`;
	// eslint-disable-next-line
	}, []);
	// check if user is google or password provider
	useEffect(() =>{
		setIsGoogleProvider(isProviderGoogle());
		setIsPasswordProvider(isProviderPasswordUser());
	},[isProviderGoogle, isProviderPasswordUser])

	// Upload photo and hidden input type file
	const hiddenFileInput = useRef(null);
	const handleClick = () => {
		hiddenFileInput.current.click();
	};
	const handleUpdateAvatar = async event => {
		setError("");
		setLoading(true);
		const fileUploaded = event.target.files[0];
		await uploadAvatar(fileUploaded);
		setUserAvatar(currentUser.photoURL);
		setIsUploadPhoto(true);
		setLoading(false);
  	};
	useEffect(() =>{
		if(profileImg !== userAvatar){
			setIsUploadPhoto(true);
		}
	}, [userAvatar])
	// Remove photo
	const handleRemoveAvatar = async () =>{
		setError("");
		setLoading(true);
		setIsUploadPhoto(false);
		await removeAvatar();
		setUserAvatar(currentUser.photoURL);
		setLoading(false);
	}
 	// change name
 	function handlerChangeName(name){
		setError("");
	  	setUserName(name);
		if(currentUser.displayName !== name){
			setIsUpdate(true);
		} else{
			setIsUpdate(false);
		}
  }
  	// submit
  	async function Update(e){
		e.preventDefault();
		setError("");
		await	changeName(userName);
		setIsUpdate(false);
	}
	// link google account
	async function handleLogInWithGoogle(){
		setLoading(true);
		try{
			setError("");
			await LinkInGoogle();
			setLoading(false);
		} catch(e){
			setLoading(false);
			console.log(e.message);
			setError(e.message);
		}
	}
	// unlink google account
	async function handleDisconectGoogle(){
		setLoading(true);
		try{
			setError("");
			await unlinkGoogle();
			setLoading(false);
		} catch(e){
			setLoading(false);
			setError(e.message);
		}
	}
	// cancel
	const handlerCancel = () =>{
		setError("");
		setIsUpdate(false);
		setUserName(currentUser.displayName);
	}
	return (
		<form className="settings__form" onSubmit={Update}>
			<header className="settings__header">
				<span className="fas fa-arrow-left main-back" onClick={handelActiveSidebar.bind(null, true)}></span>
				<h2 className="settings__title">{t("account")}</h2>
				<span className="fas fa-times close" onClick={close}></span>
			</header>
			<div className="settings__account settings__container">
				{/**Photo*/}
				<div className="settings-account__block settings__block">
					<h3 className="settings__subtitle">{t("photo")}</h3>
					<div className="settings__group">
						<div className="settings-account__img">
							<img src={userAvatar} alt="" />
						</div>
						<div>
							<div className="settings-account__block-btn">
								<input type="file" accept="image/*" ref={hiddenFileInput} onChange={handleUpdateAvatar} hidden/>
								<button 
									className="settings-account__btn" 
									onClick={handleClick} 
									type="button" 
									disabled={loading}>{t("uploadPhoto")}</button>
								{isUploadPhoto &&
								 <button 
									className="settings-account__btn btn-red" 
									type="button" 
									onClick={handleRemoveAvatar}
									disabled={loading}>
								{t("removePhoto")}</button>}
							</div>
							<span className="settings__subtext">{t("sizePhoto")}</span>
						</div>
					</div>
				</div>
				<div className="settings__block">
					{error && <strong className="fas fa-exclamation-circle denger">{error}</strong>}
				</div>
				{/**Name*/}
				<div className="settings-account__block settings__block">
					<h3 className="settings__subtitle">{t("name")}</h3>
					<div className="settings__group">
						<div className="input settings__input">
							<input 
								type="text" 
								name="name" 
								id="name"
								value={userName}
								onChange={(e) =>handlerChangeName(e.target.value)} />
						</div>
					</div>
				</div>
				{/**Email*/}
				<div className="settings-account__block settings__block">
					<h3 className="settings__subtitle">{t("email")}</h3>
					<div className="settings-account__group settings__group">
						<span className="settings__text">{currentUser.email}</span>
						<Link to="/settings/account/email" className="settings-account__btn">{t("changeEmail")}</Link>
					</div>
				</div>
				{/**Password*/}
				<div className="settings-account__block settings__block">
					<h3 className="settings__subtitle">{t("password")}</h3>
						<Link to="/settings/account/password" className="settings-account__btn">{t("changePassword")}</Link>
				</div>
				{/*Connected accounts*/}
				<div className="settings-account__block settings__block">
					<h3 className="settings__subtitle">{t("connectedAccounts")}</h3>
					<div className="settings-account__group settings__group">
						<p className="settings__subtext">{t("logTodoListGoogle")}</p>
					</div>
					<div className="settings-account__block settings__block">
						{isGoogleProvider && googleAccount && <div className="settings-account__group settings__group">
							<p className="settings__text">{t("connectedAccountsInfo1")} <span>{googleAccount.email}</span>
							</p>
						</div>}
						{!isPasswordProvider && <div className="settings-account__group settings__group">
							<p className="settings__text">
								<Trans i18nKey="connectedAccountsInfo2">
									Your password is not set, so we cannot disconnect you from your Google account. If you want to disconnect, please <Link to="/settings/account/password" className="settings__link">set up your password</Link> first.
								</Trans>
							</p>
						</div>}
						{!isGoogleProvider &&  <div className="settings-account__group settings__group">
							<button className="btn-submit settings__btn-social" onClick={handleLogInWithGoogle.bind(null)} disabled={loading}>
								<img className="settings__img-social" src={googleIcon} alt="Google Icon" />
								{t("logInWithGoogle")}
							</button>
						</div>}
						{isPasswordProvider && isGoogleProvider && <div className="settings-account__group settings__group">
							<button className="btn-submit settings__btn-social" onClick={handleDisconectGoogle.bind(null)} disabled={loading}>
								<img className="settings__img-social" src={googleIcon} alt="Google Icon" />
								{t("logOutWithGoogle")}
							</button>
						</div>}
					</div>
				</div>
				{/**Permanently delete account*/}
				<div className="settings-account__block settings__block">
					<h3 className="settings__subtitle">{t("permanentlyDeleteAccount")}</h3>
					<div className="settings-account__group settings__group">
						<span className="settings__text">{t("permanentlyDeleteAccountText")}</span>
						<Link to="/settings/account/delete" className="settings-account__btn btn-red">{t("permanentlyDeleteAccount")}</Link>
					</div>
				</div>
			</div>
			{isUpdate && <footer className="settings__footer">
				<button className="btn-cancel" type="button" onClick={handlerCancel.bind(null)}>{t("cancel")}</button>
				<button className="btn-submit settings-footer__btn-submit" type="submit">{t("update")}</button>
			</footer>}
		</form>
	);
}
 
export default Account;