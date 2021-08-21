import swipeGif from "../../img/swipe-menu.gif";
import soundVibration from "../../img/sound-vibration.png"
import { useRef, useEffect } from "react";

const ModalBox = ({setIsNewUserDialog,isNewUserDialog}) => {
	const modalBoxRef = useRef();
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
					<h2 className="dialog__title">Information for new user</h2>
					<span className="fas fa-times close" onClick={close}></span>
				</header>
					<div className="dialog__container">
						<div className="dialog__block">
						<h3 className="dialog__sub-title">Swipe menu for mobile</h3>
						<div>
							<p className="dialog__text">You can also close and open menu click on button or swipe left and right.</p>
							<div className="dialog__gif">
								<img src={swipeGif} alt="swipe gif" />
							</div>
						</div>
					</div>
					<div className="dialog__block">
						<h3 className="dialog__sub-title">Sound & vibration</h3>
						<div>
							<p className="dialog__text">In default vibration and sound for mobile turn on, you can also turn off them.</p>
							<div className="dialog__img">
								<img src={soundVibration} alt="sound & vibration" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
 
export default ModalBox;