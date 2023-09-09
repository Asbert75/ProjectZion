'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import styles from '@/components/user-form.module.css';
import TopWave from '@/components/top-wave';
import BottomWave from '@/components/bottom-wave';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faTimes } from '@fortawesome/free-solid-svg-icons';

import Spinner from '@/components/spinner';

import UserApi from '@/lib/api/user-api';

export default function ForgotPassword() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [emailIsSent, setEmailIsSent] = useState(false);


    async function Submit() {
        setHasError(false);

        if (!email.length || !email.includes('@') || !email.split('@')[1].includes('.')) {
            setHasError(true);
            setTimeout(() => {
                setHasError(false);
            }, 5000);
            return;
        }

        setIsLoading(true);
        await UserApi.sendResetPasswordEmail(email);
        setEmailIsSent(true);
        setIsLoading(false);
    }

    return (
        <div className={styles.backgroundContainer}>
            <TopWave></TopWave>

            <div className={[styles.container, 'ambientKeyLight', hasError ? 'shake' : ''].join(" ")}>
                <div className={styles.cancelButtonContainer} onClick={() => router.back()}>
                    <FontAwesomeIcon
                        icon={faTimes}
                        style={{ fontSize: 18, color: '#949699' }}
                    />
                </div>


                {emailIsSent ?
                    <>
                        <div className={styles.header}>
                            <h2>Success!</h2>
                            <p>An email with instructions how to reset your password will be sent to <span>{email}</span>, if it is connected to an existing account.</p>
                        </div>

                        <div className={styles.submitContainer}>
                            <button onClick={() => router.push('/')}>
                                Home
                            </button>
                        </div>
                    </>
                    :
                    <>
                        <div className={styles.header}>
                            <h2>Forgot Password?</h2>
                            <p>Don't worry, we'll send you reset instructions.</p>
                        </div>

                        <div className={[styles.inputGroup, styles.inputGroupFirst, hasError ? styles.hasError : ''].join(" ")}>
                            <label>Email</label>

                            <FontAwesomeIcon
                                icon={faAt}
                                style={hasError ? { fontSize: 18, color: '#ff6d6d' } : emailFocused ? { fontSize: 18, color: '#ff31b3' } : { fontSize: 18, color: '#949699' }}
                            />
                            <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} onFocus={() => { setEmailFocused(true); setHasError(false); }} onBlur={() => { setEmailFocused(false) }} />
                        </div>

                        <div className={[styles.submitContainer, isLoading ? styles.submitLoading : ''].join(" ")}>
                            <button onClick={() => Submit()} disabled={isLoading}>
                                {isLoading ?
                                    <Spinner size={22}></Spinner> : 'Reset password'
                                }
                            </button>
                        </div>
                    </>
                }
            </div>

            <BottomWave></BottomWave>
        </div>
    )
}
