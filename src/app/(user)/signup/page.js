'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

import UserApi from '@/lib/api/user_api';
import Link from 'next/link';

import useLoginStore from "@/store/useUser";

import styles from '../page.module.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faTimes } from '@fortawesome/free-solid-svg-icons';

import Spinner from '@/components/spinner';

export default function Page() {
	const router = useRouter();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const [usernameError, setUsernameError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const [errorList, setErrorList] = useState([]);

	const [usernameFocused, setUsernameFocused] = useState(false);
	const [passwordFocused, setPasswordFocused] = useState(false);
	const [passwordConfirmFocused, setPasswordConfirmFocused] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	const loginDiv = useRef(null);

	const login = useLoginStore((state) => state.login);

	async function Submit() {
		setIsLoading(true);
		if (loginDiv?.current) loginDiv.current.classList.remove('shake'); // Reset animation
		const errors = [];

		// Prevalidated errors
		if (!username?.length) {
			setUsernameError(true);
			errors.push('Username must not be empty.');
		}
		if ((!password?.length || !passwordConfirm?.length)) {
			setPasswordError(true);
			errors.push('Password must not be empty.');
		}
		if ((!username?.length) || (!password?.length || !passwordConfirm?.length)) {
			setErrorList(errors);

			if (loginDiv?.current) loginDiv.current.classList.add('shake');
			setIsLoading(false);
			return;
		}

		// Send API call
		const response = await UserApi.create(username, password, passwordConfirm);
		setIsLoading(false);

		if (response.code === 400) {
			handleRequestErrors(response, errors);
			return;
		}

		// Everything has gone well, login and navigate the user away
		await login(username, password);
		router.push('/user');
	}

	function handleRequestErrors(response, errors) {
		// Username errors
		if (response.data?.username) {
			setUsernameError(true);
			errors.push(response.data.username.message);
		}

		// Password errors
		if (response.data?.password) {
			const error = response.data.password;
			setPasswordError(true);

			if (error.code = 'validation_length_out_of_range') errors.push('Password must be between 8 and 72 characters.');
			else console.log('Unknown error', error);
		}

		// Password Confirm errors
		if (response.data?.passwordConfirm) {
			const error = response.data.passwordConfirm;
			setPasswordError(true);

			if (error.code = 'validation_values_mismatch') errors.push('The entered passwords do not match.');
			else console.log('Unknown error', error);
		}

		setErrorList(errors);

		setTimeout(() => {
			setErrorList([]);

			setUsernameError(false);
			setPasswordError(false);

			if (loginDiv?.current) loginDiv.current.classList.remove('shake');
		}, 5000);
	}

	function onFocusChanged(field, value) {
		if (field === 'username') setUsernameFocused(value);
		else if (field === 'password') setPasswordFocused(value)
		else if (field === 'passwordConfirm') setPasswordConfirmFocused(value);

		resetErrors();
		loginDiv.current.classList.remove('shake');
	}

	function resetErrors() {
		setUsernameError(false);
		setPasswordError(false);
		setErrorList([]);
	}

	return (
		<div className={styles.backgroundContainer}>
			<div className={styles.projectName}>
				<Link href="/"><h2>Project<span>Zion</span></h2></Link>
			</div>
			<div className={[styles.login, 'ambientKeyLight'].join(" ")} ref={loginDiv}>
				<div className={styles.cancelButtonContainer} onClick={() => router.back()}>
					<FontAwesomeIcon
						icon={faTimes}
						style={{ fontSize: 18, color: '#949699' }}
					/>
				</div>

				<div className={styles.header}>
					<h2>Sign Up</h2>
				</div>

				<div className={[styles.inputGroup, styles.inputGroupFirst, usernameError ? styles.hasError : ''].join(" ")}>
					<label>Username</label>

					<FontAwesomeIcon
						icon={faUser}
						style={usernameError ? { fontSize: 18, color: '#ff6d6d' } : usernameFocused ? { fontSize: 18, color: '#00ffee' } : { fontSize: 18, color: '#949699' }}
					/>
					<input type="text" placeholder="Choose username..."
						onChange={(e) => setUsername(e.target.value)}
						tabIndex={1}
						onFocus={() => { onFocusChanged('username', true) }}
						onBlur={() => { onFocusChanged('username', false) }} />
				</div>

				<div className={[styles.inputGroup, passwordError ? styles.hasError : ''].join(" ")}>
					<label>Password</label>

					<FontAwesomeIcon
						icon={faLock}
						style={passwordError ? { fontSize: 18, color: '#ff6d6d' } : passwordFocused ? { fontSize: 18, color: '#00ffee' } : { fontSize: 18, color: '#949699' }}
					/>
					<input type="password" placeholder="Choose password..."
						onChange={(e) => setPassword(e.target.value)}
						tabIndex={2}
						onFocus={() => { onFocusChanged('password', true) }}
						onBlur={() => { onFocusChanged('password', false) }} />
				</div>

				<div className={[styles.passwordConfirm, styles.inputGroup, passwordError ? styles.hasError : ''].join(" ")}>
					<label>Confirm Password</label>

					<FontAwesomeIcon
						icon={faLock}
						style={passwordError ? { fontSize: 18, color: '#ff6d6d' } : passwordConfirmFocused ? { fontSize: 18, color: '#00ffee' } : { fontSize: 18, color: '#949699' }}
					/>
					<input type="password" placeholder="Confirm password..."
						onChange={(e) => setPasswordConfirm(e.target.value)}
						tabIndex={2}
						onFocus={() => { onFocusChanged('passwordConfirm', true) }}
						onBlur={() => { onFocusChanged('passwordConfirm', false) }} />
				</div>

				<div className={styles.errorContainer}>
					{errorList.map((error, i) => <p className='errorText' key={i}>{error}</p>)}
				</div>

				<div className={[styles.submitContainer, isLoading ? styles.submitLoading : ''].join(" ")}>
					<button onClick={() => Submit()} tabIndex={3} disabled={isLoading}>
						{isLoading ?
							<Spinner size={22}></Spinner> :
							'Sign Up'
						}
					</button>
				</div>
			</div>
		</div>
	)
}
