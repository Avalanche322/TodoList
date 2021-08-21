import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import logo from '../img/logo.png'
import googleIcon from '../img/google-icon.png';
import { useAuth } from '../contexts/AuthContext';

const SingUp = () => {
	const {singup,singInWithGoogle} = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const [isShowPassword, setIsShowPassword] = useState(false);

	useEffect(() => {
		// title for page
		document.title = "SingUp | TodoList"
	}, [])
	async function handleSubmit(e){
		e.preventDefault();

		if(!password && !name){
			return setError('All fields must be filled')
		}
		else if(!(/^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password))){
			return setError('password must be at least 8 characters long contain a number and an uppercase letter')
		}
		try{
			setError('');
			setLoading(true);
			await singup(email,password,name);
			history.push('/');
		} catch(error){
			setLoading(false);
			setError(error.message)		
		}
	}
	async function handleSubmitWithGoogle(){
		try{
			setLoading(true);
			await singInWithGoogle();
			history.push('/');
		} catch(e){
			setLoading(false);
		}
	}
	function handlerInputEmail (e){
		setError('');
		setEmail(e.target.value);
	}
	function handlerInputName (e){
		setError('');
		setName(e.target.value);
	}
	function handlerInputPass (e){
		setError('');
		setPassword(e.target.value);
	}
	return (
		<div className="sing-up">
			<div className="sing-up__body">
				<div className="sing-up__header">
					<div className="sing-up__logo">
						<img src={logo} alt="logo" />
					</div>
					<h2 className="sing-up__title title">Sing Up</h2>
					{error && <strong className="fas fa-exclamation-circle denger">{error}</strong>}
				</div>
				<button className="btn-submit sing-in__btn-social" onClick={handleSubmitWithGoogle.bind()} disabled={loading}>
						<img className="sing-in__img-social" src={googleIcon} alt="Google Icon" />
						Continue with Google
				</button>
				<div className="sing-up__or">
					<span>OR</span>
				</div>
				<form onSubmit={handleSubmit} className="sing-up__form">
					<div className="sing-up__group">
						<label className="sing-up__label" htmlFor="email">Email</label>
						<div className="sing-up__input input">
							<input 
								onChange={handlerInputEmail}
								type="email" 
								id="email" 
								name="email"/>
						</div>
					</div>
					<div className="sing-up__group">
						<label className="sing-up__label" htmlFor="name">Your Name</label>
						<div className="sing-up__input input" >
							<input 
								onChange={handlerInputName}
								type="text" 
								id="name" 
								name="name"/>
						</div>
					</div>
					<div className="sing-up__group">
						<label className="sing-up__label" htmlFor="password">Password</label>
						<div className="input">
							<input 
								onChange={handlerInputPass}
								type={isShowPassword ? "text" : "password"} 
								id="password" 
								name="password" />
							<button 
								type="button" 
								className={`${isShowPassword ? "far fa-eye" : "far fa-eye-slash"} btn-password`}
								onClick={setIsShowPassword.bind(null,!isShowPassword)}></button>
						</div>
					</div>
					<button type="submit" className="btn-submit sing-up__btn-submit" disabled={loading}>Sing Up</button>
				</form>
				<p className="sing-up__link">Already have account? <Link to="/singin" className="link-reset-password">Sing In</Link></p>
				<p className="sing-up__link"><Link to="/forgotPassword" className="link-reset-password">Forgot your password?</Link></p>
			</div>
		</div>
	);
}
 
export default SingUp;