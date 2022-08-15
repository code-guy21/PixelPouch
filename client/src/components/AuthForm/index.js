import React, { useState } from 'react';
import { login, register } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';
import './style.css';

function AuthForm({modalState}) {
	const navigate = useNavigate();
	const [toggle, setToggle] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		username: '',
		password: '',
	});
	const [formError, setFormError] = useState(false);

	const handleFormSubmit = async e => {
		e.preventDefault();

		try {
			let response = toggle ? await register(formData) : await login(formData);
			let { token, user } = await response.json();
			Auth.login(token);
			navigate('/dashboard');
		} catch (error) {
			setFormError(true);
		}
	};

	const handleChange = ({ target }) => {
		if (target.name === 'option') {
			if (toggle) {
				setFormData({ ...formData, email: target.value });
			} else {
				let regex = new RegExp('^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$');
				if (regex.test(target.value)) {
					setFormData({ ...formData, email: target.value });
				} else {
					setFormData({ ...formData, username: target.value });
				}
			}
		} else {
			setFormData({ ...formData, [target.name]: target.value });
		}
	};

	return (
		<div className={modalState? "auth": "auth hide"}>
			<h3 className='heading'>{toggle ? 'Sign up' : 'Log in'} </h3>
			<form>
				<input
					id='option'
					className='form_input'
					placeholder={toggle ? 'Email' : 'Email or Username'}
					name='option'
					onChange={handleChange}
				/>
				<input
					className={toggle ? 'form_input' : 'hide form_input'}
					placeholder='Username'
					name='username'
					onChange={handleChange}
					value={formData.username}
				/>
				<input
					className='form_input'
					type='password'
					placeholder='Password'
					name='password'
					onChange={handleChange}
					value={formData.password}
				/>
				<button id='submit' className='option' onClick={handleFormSubmit}>
					Submit
				</button>
			</form>
			<span id='feedback' className={formError ? '' : 'hide'}>
				failed to {toggle ? 'register' : 'log in'}
			</span>
			<div id='switch'>
				<label>
					{toggle ? 'Already have an account? ' : "Don't have an account? "}
				</label>
				<a

					onClick={() => {
						setToggle(!toggle);
						setFormData({
							email: '',
							username: '',
							password: '',
						});
						setFormError(false);
						document.getElementById('option').value = '';
					}}>
					{toggle ? 'Log in' : 'Sign up'}
				</a>
				
			</div>
		</div>
	);
}

export default AuthForm;
