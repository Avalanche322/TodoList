import logo from '../img/logo.png'
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const SingIn = () => {
	const {singin} = useAuth();
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
			console.log(e.message);
			setLoading(false);
			setError('Email or password incorrect')
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