import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import logo from '../../img/logo.png'

const Footer = () => {
	const {i18n} = useTranslation();
	const {updateSettings, currentUser} = useAuth();
	let settings = JSON.parse(localStorage.getItem('settings'));
	const handlerChangeLanguege = (e) =>{
		if(settings.vibration) navigator.vibrate(8); // togle vibration
		try{
			settings.language = e.target.value;
			if(currentUser){
				updateSettings(settings)
			} else{
				i18n.changeLanguage(settings.language);
			}
			localStorage.setItem('settings', JSON.stringify(settings));
		}catch(e){
			alert(e.message);
		}
	}
	return (
		<footer className='footer'>
			<div className='big-container'>
				<div className="footer__top top-footer">
					<div className="footer__content top-footer__content">
						<div className="top-footer__short">
							<img src={logo} alt="logo" className='top-footer__logo' />
							<p className='top-footer__text'>Stay up-to-date on all things TodoList by following us on social media.</p>
							<div>
								<Link className='top-footer__link fab fa-twitter' to='https://twitter.com/?lang=uk'></Link>
								<Link className='top-footer__link fab fa-telegram-plane' to='https://web.telegram.org/z/'></Link>
								<Link className='top-footer__link fab fa-youtube' to='https://www.youtube.com/'></Link>
								<Link className='top-footer__link fab fa-instagram' to='https://www.instagram.com/'></Link>
							</div>
						</div>
						<div className="top-footer__blocks">
							<div className="top-footer__block block-top-footer">
								<h3 className='block-top-footer__title'>FEATURES</h3>
								<Link className='block-top-footer__link' to='/help'>How It Works</Link>
								<Link className='block-top-footer__link' to='/help'>For Teams</Link>
								<Link className='block-top-footer__link' to='/help'>Pricing</Link>
								<Link className='block-top-footer__link' to='/help'>Templates</Link>
							</div>
							<div className="top-footer__block block-top-footer">
								<h3 className='block-top-footer__title'>RESOURCES</h3>
								<Link className='block-top-footer__link' to='/help'>Download Apps</Link>
								<Link className='block-top-footer__link' to='/help'>Help Center</Link>
								<Link className='block-top-footer__link' to='/help'>Productivity Methods</Link>
								<Link className='block-top-footer__link' to='/help'>Refer a friend</Link>
								<Link className='block-top-footer__link' to='/help'>Integrations</Link>
								<Link className='block-top-footer__link' to='/help'>Channel Partners</Link>
							</div>
							<div className="top-footer__block block-top-footer">
								<h3 className='block-top-footer__title'>COMPANY</h3>
								<Link className='block-top-footer__link' to='/help'>About Us</Link>
								<Link className='block-top-footer__link' to='/help'>We are hiring!</Link>
								<Link className='block-top-footer__link' to='/help'>Blog</Link>
								<Link className='block-top-footer__link' to='/help'>Press</Link>
								<Link className='block-top-footer__link' to='/help'>Twist</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="footer__bottom bottom-footer">
					<div className="footer__content">
						<div className="bottom-footer__list">
							<Link to='/help' className='bottom-footer__item'>Security</Link> 
							<Link to='/help' className='bottom-footer__item'>Privacy</Link> 
							<Link to='/help' className='bottom-footer__item'>Terms</Link> 
							<Link 
								to='https://github.com/Avalanche322' 
								className='bottom-footer__item'
							>© Avalanche Inc.</Link>
						</div>
						<div className="select header-help__select" tabIndex="1">
								<select name="language" id="language" onChange={handlerChangeLanguege} value={settings?.language}>
									<option value="en">English</option>
									<option value="uk">Ukraine</option>
								</select>
								<i className="fas fa-sort-down select__arrow"></i>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
 
export default Footer;