'use client';

// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import styles from './header.module.css'

import Link from 'next/link'
import Image from 'next/image'

import { useSession } from 'next-auth/react'
import { useState } from 'react';

import { signOut } from 'next-auth/react';

export default function Header() {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false);

    async function onSignout() {
        setIsLoading(true);
        await signOut({ redirect: false, callbackUrl: '/' });
        setShowConfirmLogoutModal(false);
        setIsLoading(false);
    }

    return (
        <nav className={[styles.navigation, 'pt2', 'pb2'].join(" ")}>
            <div>
                <Link href="/"><h2>Project<span>Zion</span></h2></Link>
            </div>
            {session && session.user ?
                (
                    <div className={styles.userSetting}>
                        {session.user.image ?
                            <Image src={session.user.image} alt="User" width={22} height={22}></Image> :
                            <FontAwesomeIcon
                                icon={faUserCircle}
                                style={{ fontSize: 22, color: '#2c3035' }}
                            />
                        }
                        <p>{session.user.username}</p>
                        <a onClick={() => setShowConfirmLogoutModal(true)}>
                            <FontAwesomeIcon
                                icon={faSignOut}
                                style={{ fontSize: 22, color: '#2c3035' }}
                                className={'fa-link'}
                            />
                        </a>
                        {/* <Link href='/api/auth/signout?callbackUrl=/'> */}
                    </div>
                ) :
                (
                    <div>
                        <Link href='/signin'>
                            <FontAwesomeIcon
                                icon={faSignIn}
                                style={{ fontSize: 22, color: '#2c3035' }}
                                className={'fa-link'}
                            />
                        </Link>
                    </div>
                )
            }

            {showConfirmLogoutModal ?
                <>
                    <div className={styles.confirmLogoutModalContainer}>
                        <div className='ambientLight'>
                            <h3>Are you sure you want to sign out?</h3>

                            <div className={styles.actions}>
                                <button className='btn btnPrimary' onClick={() => onSignout()} disabled={isLoading}>
                                    Sign out
                                </button>
                                <button className='btn btnSecondary' onClick={() => setShowConfirmLogoutModal(false)} disabled={isLoading}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </>
                :
                null
            }
        </nav>
    );
}