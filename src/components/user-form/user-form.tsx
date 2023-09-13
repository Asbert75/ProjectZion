'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';

import styles from './user-form.module.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faTimes, faAt } from '@fortawesome/free-solid-svg-icons';

import Spinner from '@/components/spinner';

import { signIn } from 'next-auth/react'
import UserApi from '@/api/user-api';

import TopWave from '../top-wave';
import BottomWave from '../bottom-wave';

type Props = {
    type: string
}

export default function UserForm(props: Props) {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);

    const container = useRef(null);

    const [errorList, setErrorList] = useState([] as string[]);
    const [isLoading, setIsLoading] = useState(false);

    function shake() {
        container?.current?.classList.add('shake');
        setTimeout(() => {
            container?.current?.classList.remove('shake');
        }, 500);
    }

    async function Submit() {
        const errors: string[] = [];
        if (!username.length || !password.length) {
            shake();
            errors.push('Please fill out all fields before proceeding');
            setErrorList(errors);
            setTimeout(() => {
                setErrorList([]);
            }, 5000);
            return;
        }

        setIsLoading(true);
        if (props.type === 'signup') {
            const response = await UserApi.create(email, username, password);
            if (response.code === 400) {
                shake();
                handleRequestErrors(response.data, errors);

                setIsLoading(false);
                return;
            }
        }

        const response = await signIn('credentials', { username, password, redirect: false });
        if (response?.error) {
            shake();
            if (!errorList.find(e => e.startsWith('Invalid'))) errorList.push('Invalid username or password');
            setIsLoading(false);
        } else router.push('/dashboard');
    }

    function onFocusChanged(field: string, value: boolean) {
        if (field === 'username') setUsernameFocused(value);
        else if (field === 'password') setPasswordFocused(value)
        else if (field === 'email') setEmailFocused(value);

        setErrorList([]);
    }

    function handleRequestErrors(response: any, errors: string[]) {
        if (response?.username) {
            errors.push(response.username.message);
        }

        if (response?.password) {
            if (response.password.code = 'validation_length_out_of_range') errors.push('Password must be between 8 and 72 characters');
            else console.log('Unknown error', response.password);
        }

        setErrorList(errors);
        setTimeout(() => {
            setErrorList([]);
        }, 5000);
    }

    return (
        <div className={styles.backgroundContainer}>
            <TopWave></TopWave>

            <div className={styles.projectName}>
                <Link href="/"><h2>Project<span>Zion</span></h2></Link>
            </div>
            <div className={[styles.container, errorList.length ? 'shake' : ''].join(" ")} ref={container}>
                <div className={styles.cancelButtonContainer} onClick={() => router.push('/')}>
                    <FontAwesomeIcon
                        icon={faTimes}
                        style={{ fontSize: 18 }}
                        className='fa-link'
                    />
                </div>

                <div className={styles.header}>
                    <h2>{props.type === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
                </div>

                {props.type === 'signin' ||
                    <div className={[styles.inputGroup, styles.inputGroupFirst, errorList.length ? styles.hasError : ''].join(" ")}>
                        <label>Email</label>

                        <FontAwesomeIcon
                            icon={faAt}
                            style={{ fontSize: 18 }}
                            className={'text-muted'}
                        />
                        <input type="text" placeholder="Choose email"
                            onChange={(e) => setEmail(e.target.value)} tabIndex={1}
                            onFocus={() => { onFocusChanged('email', true) }} onBlur={() => { onFocusChanged('email', false) }} />
                    </div>
                }

                <div className={[styles.inputGroup, styles.inputGroupFirst, errorList.length ? styles.hasError : ''].join(" ")}>
                    <label>Username</label>

                    <FontAwesomeIcon
                        icon={faUser}
                        style={{ fontSize: 18 }}
                        className={'text-muted'}
                    />
                    <input type="text" placeholder={props.type === 'signin' ? "Enter username" : 'Choose a username'}
                        onChange={(e) => setUsername(e.target.value)} tabIndex={1}
                        onFocus={() => { onFocusChanged('username', true) }} onBlur={() => { onFocusChanged('username', false) }} />
                </div>

                <div className={[styles.inputGroup, errorList.length ? styles.hasError : ''].join(" ")}>
                    <label>Password</label>

                    <FontAwesomeIcon
                        icon={faLock}
                        style={{ fontSize: 18 }}
                        className={'text-muted'}
                    />
                    <input type="password" placeholder={props.type === 'signin' ? "Enter password" : 'Choose a password'}
                        onChange={(e) => setPassword(e.target.value)} tabIndex={2}
                        onFocus={() => { onFocusChanged('password', true) }} onBlur={() => { onFocusChanged('password', false) }} />
                </div>

                {props.type === 'signin' && <div className={[styles.forgotPassword, isLoading ? 'disabled' : ''].join(" ")}><Link href="/forgotpassword">Forgot password?</Link></div>}

                <div className={styles.errorContainer}>
                    {errorList.map((error, i) => <p className='error' key={i}>{error}</p>)}
                </div>

                <div className={[styles.submitContainer, isLoading ? styles.submitLoading : ''].join(" ")}>
                    <button onClick={() => Submit()} tabIndex={3} disabled={isLoading}>
                        {isLoading ?
                            <Spinner size={22}></Spinner> :
                            props.type === 'signin' ? 'Sign In' : 'Sign Up'
                        }
                    </button>
                </div>

                {props.type === 'signin' && <div className={[styles.signupContainer, isLoading ? 'disabled' : ''].join(" ")}><Link href="/signup">Or Sign Up</Link></div>}
            </div>

            <BottomWave></BottomWave>
        </div>
    )
}
