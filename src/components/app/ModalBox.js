import swipeGifMain from "../../img/swipe-menu.gif";
import swipeGifSettings from "../../img/swipe-menu-settings.gif";
import contextMenuMobile from "../../img/context-menu-mobile.gif"
import soundVibration from "../../img/sound-vibration.png";
import { useRef, useEffect, memo } from "react";
import { useTranslation } from "react-i18next";

const ModalBox = ({setIsNewUserDialog,isNewUserDialog}) => {
	const modalBoxRef = useRef();
	const { t } = useTranslation();
	function close (){
		setIsNewUserDialog(false);
	}
	useEffect(() =>{
		if(isNewUserDialog){
			let hendler = (event) =>{
				if(!modalBoxRef.current.contains(event.target)){
					close();
				}
			}
			document.addEventListener("mousedown", hendler)
			return () =>{
				document.removeEventListener("mousedown", hendler)
			}
		}
	})
	return (
		<div className="dialog">
			<div className="dialog__body" ref={modalBoxRef}>
				<header className="dialog__header">
					<h2 className="dialog__title">{t("informationForNewUser")}</h2>
					<span className="fas fa-times close" onClick={close}></span>
				</header>
				<div className="dialog__container">
					<div className="dialog__block">
						<h3 className="dialog__sub-title">{t("swipeMenu")}</h3>
						<div>
							<p className="dialog__text">{t("swipeMenuInform")}</p>
							<div className="dialog__gif">
								<img src={swipeGifMain} loading='lazy' alt="swipe gif" />
							</div>
							<div className="dialog__gif">
								<img src={swipeGifSettings} loading='lazy' alt="swipe gif" />
							</div>
						</div>
					</div>
					<div className="dialog__block">
						<h3 className="dialog__sub-title">{t("contexMenu")}</h3>
						<div>
							<p className="dialog__text">{t("contexMenuInform")}</p>
							<div className="dialog__gif">
								<img src={contextMenuMobile} loading='lazy' alt="context menu for mobile" />
							</div>
						</div>
					</div>
					<div className="dialog__block">
						<h3 className="dialog__sub-title">{t("soundVibration")}</h3>
						<div>
							<p className="dialog__text">{t("soundVibrationInform")}</p>
							<div className="dialog__img">
								<img src={soundVibration} loading='lazy' alt="sound & vibration" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
 
export default memo(ModalBox);