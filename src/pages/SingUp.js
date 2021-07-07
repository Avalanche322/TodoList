import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import logo from '../img/logo.png'
import googleIcon from '../img/google-icon.png';

const SingUp = () => {
	const {singup,singInWithGoogle} = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e){
		e.preventDefault();

		if(!password && !name && !passwordConfirm){
			return setError('All fields must be filled')
		}
		else if(!(/^[A-Za-z\s]+$/.test(name))){
			return setError('The name must not have a number or special character')
		}
		else if(!(/[^A-Za-z0-9]/.test(password)) && !(password.length > 8)){
			return setError('password must be at least 8 characters long contain a number and an uppercase letter')
		}
		else if(password !== passwordConfirm){
			return setError('Passwords do not match')
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
						<input 
							className="sing-up__input" 
							onChange={(e) => setEmail(e.target.value)}
							type="email" 
							id="email" 
							name="email"/>
					</div>
					<div className="sing-up__group">
						<label className="sing-up__label" htmlFor="name">Your Name</label>
						<input 
							className="sing-up__input" 
							onChange={(e) => setName(e.target.value)}
							type="text" 
							id="name" 
							name="name"/>
					</div>
					<div className="sing-up__group">
						<label className="sing-up__label" htmlFor="password">Password</label>
						<input 
							className="sing-up__input" 
							onChange={(e) => setPassword(e.target.value)}
							type="password" 
							id="password" 
							name="password"/>
					</div>
					<div className="sing-up__group">
						<label className="sing-up__label" htmlFor="password-confirm">Password Confirmation</label>
						<input 
							className="sing-up__input" 
							onChange={(e) => setPasswordConfirm(e.target.value)}
							type="password" 
							id="password-confirm" 
							name="password-confirm"/>
					</div>
					<button type="submit" className="btn-submit sing-up__btn-submit" disabled={loading}>Sing Up</button>
				</form>
				<p className="sing-up__link-sing-in">Already have account? <Link to="/singin">Sing In</Link></p>
			</div>
		</div>
	);
}
 
export default SingUp;