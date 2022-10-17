import React, { useState } from 'react';
import { login, register } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import Auth from '../../utils/auth';
import { loginUser } from '../../redux/reducers/userSlice';
import './style.css';

function AuthForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [toggle, setToggle] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		username: '',
		password: '',
		validEmail: false,
		validForm: false,
		disabled: true,
	});
	const [formError, setFormError] = useState(false);

	const handleFormSubmit = async e => {
		e.preventDefault();

		try {
			let response = toggle
				? await register({
						email: formData.email,
						username: formData.username,
						password: formData.password,
				  })
				: await login({
						email: formData.email,
						username: formData.username,
						password: formData.password,
				  });

			if (!response.ok) {
				let text = await response.text();
				throw new Error(text);
			}

			let { token, userInfo } = await response.json();
			Auth.login(token);
			dispatch(loginUser(userInfo));
		} catch (error) {
			setFormError(false);
			setTimeout(() => {
				setFormError(error.message);
			}, 200);
		}
	};

	const switchForm = () => {
		setToggle(!toggle);
		setFormData({
			email: '',
			username: '',
			password: '',
			validEmail: false,
			validForm: false,
			disabled: true,
		});
		setFormError(false);
		document.getElementById('option').value = '';
	};

	const handleChange = ({ target }) => {
		let { email, username, password, validForm, disabled, validEmail } =
			formData;

		if (target.name === 'option') {
			email = target.value;

			if (validator.isEmail(email)) {
				username = toggle ? username : '';
				validEmail = true;
				validForm = toggle ? validEmail && username.length >= 4 : validEmail;
			} else {
				username = toggle ? username : target.value;
				email = toggle ? email : '';
				validEmail = false;
				validForm = toggle
					? validEmail && username.length >= 4
					: username.length >= 4;
			}
		} else if (target.name === 'password') {
			password = target.value;
		} else {
			username = target.value;
			validForm = target.value.length >= 4 && validEmail;
		}

		disabled = password.length < 5 || !validForm;

		setFormData({ email, username, password, validForm, disabled, validEmail });
	};

	return (
		<div className='wrapper'>
			<h3 className='heading'>{toggle ? 'Sign up' : 'Log in'} </h3>
			<form className='auth'>
				<span id='feedback' className={formError ? '' : 'hide'}>
					{formError}
				</span>
				<input
					id='option'
					className='form_input'
					placeholder={toggle ? 'Email' : 'Email or Username'}
					name='option'
					onChange={handleChange}
				/>
				<input
					className={toggle ? 'form_input' : 'hide form_input'}
					placeholder='Username (4-15 characters)'
					name='username'
					onChange={handleChange}
					value={formData.username}
				/>
				<input
					className='form_input'
					type='password'
					placeholder={toggle ? 'Password (5-15 characters)' : 'Password'}
					name='password'
					onChange={handleChange}
					value={formData.password}
				/>
				<button
					id='submit'
					className='option'
					onClick={handleFormSubmit}
					disabled={formData.disabled}>
					Submit
				</button>
			</form>

			<div id='switch'>
				<label>
					{toggle ? 'Already have an account? ' : "Don't have an account? "}
				</label>
				<a onClick={switchForm}>{toggle ? 'Log in' : 'Sign up'}</a>
			</div>
		</div>
	);
}

export default AuthForm;
