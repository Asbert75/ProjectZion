'use client';

// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faSignOut, faDashboard, faRectangleList, faGun, faWrench, faCartShopping, faFlask, faCoins } from '@fortawesome/free-solid-svg-icons';
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import styles from './header.module.css'

import Link from 'next/link'
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from "next/image";

import Modal from "../modal/modal";

export default function Header() {
    const router = useRouter();
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
        <nav className={styles.navigation}>
            <div className={styles.logotype}>
                <Link href="/">
                    <FontAwesomeIcon
                        icon={faFlask}
                        style={{ fontSize: 31 }}
                    />
                    <h2>Eternal<span>Labs</span></h2>
                </Link>
            </div>

            <div>
                <div className={styles.menu}>
                    <ul>
                        <li title="Casino">
                            <Link href='/casino'>
                                <FontAwesomeIcon
                                    icon={faCoins}
                                    style={{ fontSize: 20 }}
                                    className={'fa-link'}
                                />
                                Casino
                            </Link>
                        </li>
                        {session && session.user ?
                            <>
                                <li title="Dashboard">
                                    <Link href='/dashboard'>
                                        <FontAwesomeIcon
                                            icon={faDashboard}
                                            style={{ fontSize: 20 }}
                                            className={'fa-link'}
                                        />
                                        Dashboard
                                    </Link>
                                </li>
                                <li title="Loadouts">
                                    <Link href='/loadouts'>
                                        <FontAwesomeIcon
                                            icon={faWrench}
                                            style={{ fontSize: 20 }}
                                            className={'fa-link'}
                                        />
                                        Loadouts
                                    </Link>
                                </li>
                                <li className={styles.separate} title="Shop">
                                    <Link href='/shop'>
                                        <FontAwesomeIcon
                                            icon={faCartShopping}
                                            style={{ fontSize: 20 }}
                                            className={'fa-link'}
                                        />
                                        Shop
                                    </Link>
                                </li>

                                <li className={styles.avatar} onClick={() => router.push('/user')}>
                                    {/* <p>Wicked</p> */}
                                    <Image
                                        src={session.user.avatar ? `http://127.0.0.1:8090/api/files/users/${session.user.id}/${session.user.avatar}?thumb=100x100` : ''}
                                        alt="User"
                                        width={32}
                                        height={32}
                                    />
                                </li>
                                <li>
                                    <a onClick={() => setShowConfirmLogoutModal(true)}>
                                        <FontAwesomeIcon
                                            icon={faSignOut}
                                            style={{ fontSize: 20 }}
                                            className={'fa-link'}
                                        />
                                        Sign Out
                                    </a>
                                </li>
                            </>
                            :
                            <li title="Sign In">
                                <Link href='/signin' >
                                    <FontAwesomeIcon
                                        icon={faSignIn}
                                        style={{ fontSize: 20 }}
                                        className={'fa-link'}
                                    />
                                    Sign In
                                </Link>
                            </li>}
                    </ul>
                </div>
            </div>

            <Modal
                isVisible={showConfirmLogoutModal}
                header='Are you sure you want to sign out?'
                confirm='Sign Out'
                isDisabled={isLoading}
                confirmCallback={() => onSignout()}
                cancelCallback={() => setShowConfirmLogoutModal(false)}
            >
            </Modal>
        </nav>
    );
}