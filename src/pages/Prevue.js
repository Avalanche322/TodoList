import { useEffect, useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { Link } from 'react-router-dom';
//import { useTranslation } from 'react-i18next';
import Footer from '../components/app/Footer';
import mainPageImg from '../img/markdown/Screenshot_1.png'
import inboxPageImg from '../img/markdown/Screenshot_5.png'
import settingsPageImg from '../img/markdown/settings.gif'
import taskDetailsPageImg from '../img/markdown/task-details.gif'

const Prevue = () => {
	//const {t} = useTranslation();
	const [active, setActive] = useState(false);
	useEffect(() => {
		// title for page
		document.title = `TodoList: The do list to organize work & life`;
	})
	return (
		<section className='prevue'>
			<header className='prevue__header header-prevue header'>
				<div className="big-container header-prevue__content">
					<h2 className='header-prevue__title'>
						<Link to='/prevue'>The best TodoList</Link>
					</h2>
					<div className={`header-prevue__menu ${active ? '_active' : ''}`}>
						<Link className='header-prevue__link' to='/singin'>Log In</Link>
					</div>
					<div
						onClick={() => setActive(!active)}
						className={`${active ? '_active' : ''} header-prevue__humburger header__humburger`}><span></span></div>
				</div>
			</header>
			<div className='prevue__main main-prevue'>
				<div className='main-prevue__waves waves-main-prevue'>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="100vh"
						width="100%">
						<g fill="none">
							<path
								fill="rgba(77, 168, 218, 1)" 
								d="
									M0 200
									C 273,183
										500,100
										1920.00,106 

									V 700
									H 0 
									V 500
									Z">
								<animate 
									repeatCount="indefinite" 
									fill="rgba(77, 168, 218, 1)" 
									attributeName="d" 
									dur="15s" 
									values="
										M0 200
										C 473,283
										500,100
										1920,116 

										V 700
										H 0 
										V 500
										Z; 

										M0 200
										C 473,-40
										700,400
										1920,136 

										V 700
										H 0 
										V 500
										Z; 

										M0 200
										C 973,260
										900,200
										1920,120 

										V 700
										H 0 
										V 500
										Z; 

										M0 200
										C 473,283
										500,100
										1920,116 

										V 700
										H 0 
										V 500
										Z
										">
								</animate>
							</path>
							<path 
								fill="rgba(0, 124, 199, 1)" 
								d="
									M0 67
									C 273,183
										822,200
										1920.00,106 

									V 700 
									H 0 
									V 500
									Z">
								<animate 
									repeatCount="indefinite" 
									fill="rgba(0, 124, 199, 1)" 
									attributeName="d" 
									dur="25s" 
									values="
										M0 350
										C 473,283
										822,200
										1920,116 

										V 700 
										H 0 
										V 500 
										Z; 

										M0 350
										C 473,200
										1222,423
										1920,136 

										V 700 
										H 0 
										V 500 
										Z; 

										M0 350
										C 973,460
										1722,203
										1920,120 

										V 700
										H 0 
										V 500 
										Z; 

										M0 350
										C 473,283
										822,200
										1920,116 

										V 700 
										H 0 
										V 500 
										Z
										">
								</animate>
							</path>
						</g>
						<foreignObject width='100%' height='100%'>
							<div className='waves-main-prevue__block'>
								<h2 className='waves-main-prevue__title'>Organize it all with TodoList</h2>
								<Link to='/singup' className='btn-submit main-prevue__btn'>Get started</Link>
							</div>
						</foreignObject>
					</svg>
				</div>
				<div className="big-container">
					<div className='main-prevue__section'>
						<div className="main-prevue__content">
							<div className='main-prevue__block'>
								<p className="main-prevue__uppertitle">Global TodoList</p>
								<h3 className='main-prevue__title'>Manage your to-do's from anywhere.</h3>
								<p className='main-prevue__text'>Create and access your to-do lists from anywhere: desktop, mobile phone, or browser tab. Now you'll never miss an idea or forget what you need to do next.</p>
							</div>
							<ScrollAnimation 
								animateIn='zoom'
								animateOut='zoom-default' 
								initiallyVisible={true}
								style={{opacity: '1'}}>
								<div className='main-prevue__img'>
									<img src={mainPageImg} alt="main page" loading="lazy" />
								</div>
							</ScrollAnimation>
						</div>
					</div>
					<div className='main-prevue__section'>
						<div className="main-prevue__content">
							<div className='main-prevue__block'>
								<p className="main-prevue__uppertitle">Customization</p>
								<h3 className='main-prevue__title'>Create the perfect list for every need.</h3>
								<p className='main-prevue__text'>You can make TodoList show what you want, how you want. Add formatting, coloring, and link items with assignees or tasks to transform lists into actionable workflows.</p>
							</div>
							<ScrollAnimation 
									animateIn='zoom' 
									animateOut='zoom-default' 
									initiallyVisible={true}
									style={{opacity: '1'}}>
								<div className='main-prevue__img'>
									<img src={settingsPageImg} alt="settings page" loading="lazy" />
								</div>
							</ScrollAnimation>
						</div>
					</div>
					<div className='main-prevue__section'>
						<div className="main-prevue__content">
							<div className='main-prevue__block'>
								<p className="main-prevue__uppertitle">Organization</p>
								<h3 className='main-prevue__title'>Never miss a task or idea again.</h3>
								<p className='main-prevue__text'>TodoList Home view makes it easy to view and customize everything you need to work on. Set reminders, reschedule tasks, and assign priorities so you never lose anything again.</p>
							</div>
							<ScrollAnimation 
								animateIn='zoom'
								animateOut='zoom-default' 
								initiallyVisible={true}
								style={{opacity: '1'}}>
								<div className='main-prevue__img'>
									<img src={inboxPageImg} alt="inbox page" loading="lazy" />
								</div>
							</ScrollAnimation>
						</div>
					</div>
					<div className='main-prevue__section'>
						<div className="main-prevue__content">
							<div className='main-prevue__block'>
								<p className="main-prevue__uppertitle">Details task</p>
								<h3 className='main-prevue__title'>Create clear action items for tasks.</h3>
								<p className='main-prevue__text'>Add checklists to any task in TodoList to create clear processes for yourself</p>
							</div>
							<ScrollAnimation 
								animateIn='zoom' 
								animateOut='zoom-default' 
								initiallyVisible={true}
								style={{opacity: '1'}}
								>
								<div className='main-prevue__img'>
									<img src={taskDetailsPageImg} alt="task details page" loading="lazy" />
								</div>
							</ScrollAnimation>
						</div>
					</div>
					<div className="main-prevue__bottom bottom-main-prevue">
						<h3 className='bottom-main-prevue__title'>Create clear action items for tasks.</h3>
						<Link to='/singup' className='btn-submit main-prevue__btn'>Get Started</Link>
					</div>
				</div>
			</div>
			<Footer/>
		</section>
	);
}
 
export default Prevue;