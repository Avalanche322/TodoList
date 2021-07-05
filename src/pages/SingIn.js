import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import logo from '../img/logo.png'
import googleIcon from '../img/google-icon.png';
import apppleIcon from '../img/apple-icon.png';
import facebookleIcon from '../img/facebook-icon.png';

const SingIn = () => {
	const {singin,singInWithGoogle,singInWithFacebook} = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

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
	async function handleSubmitWithFacebook(){
		try{
			setLoading(true);
			await singInWithFacebook();
			history.push('/');
		} catch(e){
			setLoading(false);
		}
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
				<button className="btn-submit sing-in__btn-social" onClick={handleSubmitWithFacebook.bind()} disabled={loading}>
						<img className="sing-in__img-social" src={facebookleIcon} alt="Facebook Icon" />
						Continue with Fecebook
				</button>
				<div className="sing-in__or">
					<span>OR</span>
				</div>
				<form onSubmit={handleSubmit} className="sing-in__form">
					<div className="sing-in__group">
						<label className="sing-up__label" htmlFor="email">Email</label>
						<input 
							className="sing-in__input" 
							onChange={(e) => setEmail(e.target.value)}
							type="email" 
							id="email" 
							name="email" />
					</div>
					<div className="sing-in__group">
						<label className="sing-ip__label" htmlFor="password">Password</label>
						<input 
							className="sing-in__input" 
							onChange={(e) => setPassword(e.target.value)}
							type="password" 
							id="password" 
							name="password" />
					</div>
					<button type="submit" className="btn-submit sing-in__btn-submit" disabled={loading}>Sing In</button>
				</form>
				<p className="sing-in__link-sing-up">Need an account? <Link to="/singup">Sing Up</Link></p>
			</div>
		</div>
	);
}
 
export default SingIn;