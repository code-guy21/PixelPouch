import React, { useState } from 'react';
import { login, register } from '../../utils/api';
import './style.css';

function AuthForm() {
	const [toggle, setToggle] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		username: '',
		password: '',
	});

	const handleFormSubmit = () => {
		toggle ? register(formData) : login(formData);
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
		<div className='auth'>
      	<h3 className='label'>
				{toggle ? 'Sign up' : 'Log in'}{' '}
			</h3>
			<input
				id='option'
				className='form_input'
				placeholder={toggle ? '...email' : '...email or username'}
				name='option'
				onChange={handleChange}
			/>
			<input
				className={toggle ? 'form_input' : 'hide form_input'}
				placeholder='...username'
				name='username'
				onChange={handleChange}
				value={formData.username}
			/>
			<input
				className='form_input'
				type='password'
				placeholder='...password'
				name='password'
				onChange={handleChange}
				value={formData.password}
			/>
			<button id='submit' className='option' onClick={handleFormSubmit}>
				submit
			</button>
      <div id='switch'>
        <label >{toggle ? "Already have an account?": "Don't have an account?"}</label>
        <button
				
				className='option'
				onClick={() => {
					setToggle(!toggle);
					setFormData({
						email: '',
						username: '',
						password: '',
					});
					document.getElementById('option').value = '';
				}}>
				{toggle ? 'Log in' : 'Sign up'}
			</button>
      </div>
			
		</div>
	);
}

export default AuthForm;
