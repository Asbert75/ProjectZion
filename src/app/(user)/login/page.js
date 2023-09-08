'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

import UserApi from '@/lib/api/user_api';
import Link from 'next/link';

import useUser from "@/store/useUser";

import styles from '../page.module.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faTimes } from '@fortawesome/free-solid-svg-icons';

import Spinner from '@/components/spinner';

export default function Page() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);

    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const loginDiv = useRef(null);

    const login = useUser((state) => state.login);

    async function Submit() {
        setIsLoading(true);
        if (loginDiv?.current) loginDiv.current.classList.remove('shake'); // Reset animation

        // const response = await UserApi.login(username, password);
        const response = await login(username, password);
        setIsLoading(false);

        if (response.code === 400) {
            setHasError(true);
            if (loginDiv?.current) loginDiv.current.classList.add('shake');

            setTimeout(() => {
                setHasError(false);
                if (loginDiv?.current) loginDiv.current.classList.remove('shake');
            }, 5000);
            return;
        }


        // Everything has gone well, navigate the user away
        router.push('/user');
    }

    function onFocusChanged(field, value) {
        if (field === 'username') setUsernameFocused(value);
        else if (field === 'password') setPasswordFocused(value);

        setHasError(false);
        if (loginDiv?.current) loginDiv.current.classList.remove('shake');
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
                    <h2>Login</h2>
                </div>

                <div className={[styles.inputGroup, styles.inputGroupFirst, hasError ? styles.hasError : ''].join(" ")}>
                    <label>Username</label>

                    <FontAwesomeIcon
                        icon={faUser}
                        style={hasError ? { fontSize: 18, color: '#ff6d6d' } : usernameFocused ? { fontSize: 18, color: '#00ffee' } : { fontSize: 18, color: '#949699' }}
                    />
                    <input type="text" placeholder="Enter username..."
                        onChange={(e) => setUsername(e.target.value)}
                        tabIndex={1}
                        onFocus={() => { onFocusChanged('username', true) }}
                        onBlur={() => { onFocusChanged('username', false) }} />
                </div>

                <div className={[styles.inputGroup, hasError ? styles.hasError : ''].join(" ")}>
                    <label>Password</label>

                    <FontAwesomeIcon
                        icon={faLock}
                        style={hasError ? { fontSize: 18, color: '#ff6d6d' } : passwordFocused ? { fontSize: 18, color: '#00ffee' } : { fontSize: 18, color: '#949699' }}
                    />
                    <input type="password" placeholder="Enter password..."
                        onChange={(e) => setPassword(e.target.value)}
                        tabIndex={2}
                        onFocus={() => { onFocusChanged('password', true) }}
                        onBlur={() => { onFocusChanged('password', false) }} />
                </div>

                <div className={styles.forgotPassword}>
                    <Link href="/signup">Forgot password?</Link>
                </div>

                <div className={styles.errorContainer}>
                    {hasError &&
                        (
                            <p className='errorText'>You have entered an invalid username or password.</p>
                        )
                    }
                </div>

                <div className={[styles.submitContainer, isLoading ? styles.submitLoading : ''].join(" ")}>
                    <button onClick={() => Submit()} tabIndex={3} disabled={isLoading}>
                        {isLoading ?
                            <Spinner size={22}></Spinner> :
                            'Login'
                        }
                    </button>
                </div>

                <div className={styles.signupContainer}>
                    <Link href="/signup">Or Sign Up</Link>
                </div>
            </div>
        </div>
    )
}
