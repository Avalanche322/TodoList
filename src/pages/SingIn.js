import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import logo from '../img/logo.png'
import googleIcon from '../img/google-icon.png';

const SingIn = () => {
	const {singin,singInWithGoogle} = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const [isShowPassword, setIsShowPassword] = useState(false);
	useEffect(() => {
		// title for page
		document.title = "Sig In | TodoList"
	}, [])
	async function handleSubmit(e){
		e.preventDefault();
		try{
			setError('');
			setLoading(true);
			await singin(email,password);
			history.push('/');
		} catch(e){
			setLoading(false);
			setError('Email or password incorrect')
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
	function handlerInputPass (e){
		setError('');
		setPassword(e.target.value);
	}
	return (
		<div className="sing-in">
			<div className="sing-in__body">
				<div className="sing-in__header">
					<div className="sing-in__logo">
						<img src={logo} alt="logo" />
					</div>
					<h2 className="sing-in__title title">Sing In</h2>
					{error && <strong className="fas fa-exclamation-circle denger">{error}</strong>}
				</div>
				<button className="btn-submit sing-in__btn-social" onClick={handleSubmitWithGoogle.bind()} disabled={loading}>
						<img className="sing-in__img-social" src={googleIcon} alt="Google Icon" />
						Continue with Google
				</button>
				<div className="sing-in__or">
					<span>OR</span>
				</div>
				<form onSubmit={handleSubmit} className="sing-in__form">
					<div className="sing-in__group">
						<label className="sing-up__label" htmlFor="email">Email</label>
						<div className="input">
							<input 
								onChange={handlerInputEmail}
								type="email" 
								id="email" 
								name="email"/>
						</div>
					</div>
					<div className="sing-in__group">
						<label className="sing-ip__label" htmlFor="password">Password</label>
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
					<button type="submit" className="btn-submit sing-in__btn-submit" disabled={loading}>Sing In</button>
				</form>
				<p className="sing-in__link">Need an account? <Link to="/singup" className="link-reset-password">Sing Up</Link></p>
				<p className="sing-in__link"><Link to="/forgotPassword" className="link-reset-password">Forgot your password?</Link></p>
			</div>
		</div>
	);
}
 
export default memo(SingIn);