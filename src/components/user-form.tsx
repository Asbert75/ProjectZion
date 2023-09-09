'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Link from 'next/link';

import styles from './user-form.module.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faTimes, faAt } from '@fortawesome/free-solid-svg-icons';

import Spinner from '@/components/spinner';

import { signIn } from 'next-auth/react'
import UserApi from '@/lib/api/user-api';

import TopWave from './top-wave';
import BottomWave from './bottom-wave';

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

    const [errorList, setErrorList] = useState([] as string[]);
    const [isLoading, setIsLoading] = useState(false);

    async function Submit() {
        const errors: string[] = [];
        if (!username.length || !password.length) {
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
                handleRequestErrors(response.data, errors);

                setIsLoading(false);
                return;
            }
        }

        await signIn('credentials', { username, password, redirect: true, callbackUrl: '/dashboard' });
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
            if (response.password.code = 'validation_length_out_of_range') errors.push('Password must be between 8 and 72 characters.');
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
            <div className={[styles.container, 'ambientKeyLight', errorList.length ? 'shake' : ''].join(" ")}>
                <div className={styles.cancelButtonContainer} onClick={() => router.back()}>
                    <FontAwesomeIcon
                        icon={faTimes}
                        style={{ fontSize: 18, color: '#949699' }}
                    />
                </div>

                <div className={styles.header}>
                    <h2>{props.type === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
                </div>

                {props.type === 'signin' ? null :
                    <div className={[styles.inputGroup, styles.inputGroupFirst, errorList.length ? styles.hasError : ''].join(" ")}>
                        <label>Email</label>

                        <FontAwesomeIcon
                            icon={faAt}
                            style={errorList.length ? { fontSize: 18, color: '#ff6d6d' } : emailFocused ? { fontSize: 18, color: '#ff31b3' } : { fontSize: 18, color: '#949699' }}
                        />
                        <input type="text" placeholder="Choose email" onChange={(e) => setEmail(e.target.value)} tabIndex={1} onFocus={() => { onFocusChanged('email', true) }} onBlur={() => { onFocusChanged('email', false) }} />
                    </div>
                }

                <div className={[styles.inputGroup, styles.inputGroupFirst, errorList.length ? styles.hasError : ''].join(" ")}>
                    <label>Username</label>

                    <FontAwesomeIcon
                        icon={faUser}
                        style={errorList.length ? { fontSize: 18, color: '#ff6d6d' } : usernameFocused ? { fontSize: 18, color: '#ff31b3' } : { fontSize: 18, color: '#949699' }}
                    />
                    <input type="text" placeholder={props.type === 'signin' ? "Enter username" : 'Choose a username'} onChange={(e) => setUsername(e.target.value)} tabIndex={1} onFocus={() => { onFocusChanged('username', true) }} onBlur={() => { onFocusChanged('username', false) }} />
                </div>

                <div className={[styles.inputGroup, errorList.length ? styles.hasError : ''].join(" ")}>
                    <label>Password</label>

                    <FontAwesomeIcon
                        icon={faLock}
                        style={errorList.length ? { fontSize: 18, color: '#ff6d6d' } : passwordFocused ? { fontSize: 18, color: '#ff31b3' } : { fontSize: 18, color: '#949699' }}
                    />
                    <input type="password" placeholder={props.type === 'signin' ? "Enter password" : 'Choose a password'} onChange={(e) => setPassword(e.target.value)} tabIndex={2} onFocus={() => { onFocusChanged('password', true) }} onBlur={() => { onFocusChanged('password', false) }} />
                </div>

                {props.type === 'signin' ? <div className={styles.forgotPassword}>
                    <Link href="/forgotpassword">Forgot password?</Link>
                </div> : null}

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

                {props.type === 'signin' ? <div className={styles.signupContainer}>
                    <Link href="/signup">Or Sign Up</Link>
                </div> : null}
            </div>

            <BottomWave></BottomWave>
        </div>
    )
}