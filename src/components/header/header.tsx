'use client';

// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faSignOut, faCog, faChartColumn, faHome } from '@fortawesome/free-solid-svg-icons';
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import styles from './header.module.css'

import Link from 'next/link'

import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from "next/image";

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

            <div>
                <div className={styles.menu}>
                    <ul>
                        {session && session.user ?
                            <>
                                <li title="Dashboard">
                                    <Link href='/dashboard'>
                                        <FontAwesomeIcon
                                            icon={faChartColumn}
                                            style={{ fontSize: 20, color: '#2c3035' }}
                                            className={'fa-link'}
                                        />
                                        Dashboard
                                    </Link>
                                </li>
                                <li title="Settings">
                                    <Link href='/settings'>
                                        <FontAwesomeIcon
                                            icon={faCog}
                                            style={{ fontSize: 20, color: '#2c3035' }}
                                            className={'fa-link'}
                                        />
                                        Settings
                                    </Link>
                                </li>
                                <li className={styles.signoutButton}>
                                    <a onClick={() => setShowConfirmLogoutModal(true)}>
                                        <FontAwesomeIcon title="Sign Out"
                                            icon={faSignOut}
                                            style={{ fontSize: 20, color: '#2c3035' }}
                                            className={'fa-link'}
                                        />
                                        Sign Out
                                    </a>
                                </li>
                                <li>
                                    <Image
                                        className={styles.avatar}
                                        src={session.user.avatar ? `http://127.0.0.1:8090/api/files/users/${session.user.id}/${session.user.avatar}?thumb=100x100` : ''}
                                        alt="User"
                                        width={32}
                                        height={32}
                                    />
                                </li>
                            </>
                            :
                            <li>
                                <Link href='/signin' title="Sign In">
                                    <FontAwesomeIcon
                                        icon={faSignIn}
                                        style={{ fontSize: 20, color: '#2c3035' }}
                                        className={'fa-link'}
                                    />
                                    Sign In
                                </Link>
                            </li>}
                    </ul>
                </div>

                {/* {session && session.user ?
                    (
                        <div className={styles.userSetting}>
                            <div className={styles.user}>
                                {session.user.avatar ?
                                    <Image className={styles.avatar} src={`http://127.0.0.1:8090/api/files/users/${session.user.id}/${session.user.avatar}?thumb=100x100`} alt="User" width={32} height={32}></Image> :
                                    <FontAwesomeIcon
                                        icon={faUserCircle}
                                        style={{ fontSize: 22, color: '#2c3035' }}
                                    />
                                }
                                <p>{session.user.username}</p>
                            </div>
                            <a onClick={() => setShowConfirmLogoutModal(true)}>
                                <FontAwesomeIcon title="Sign Out"
                                    icon={faSignOut}
                                    style={{ fontSize: 22, color: '#2c3035' }}
                                    className={'fa-link'}
                                />
                            </a>
                        </div>
                    ) :
                    (
                        <div>
                            <Link href='/signin' title="Sign In">
                                <FontAwesomeIcon
                                    icon={faSignIn}
                                    style={{ fontSize: 22, color: '#2c3035' }}
                                    className={'fa-link'}
                                />
                            </Link>
                        </div>
                    )
                } */}
            </div>

            {showConfirmLogoutModal ?
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
                :
                null
            }
        </nav>
    );
}