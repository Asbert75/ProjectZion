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

export default function Header() {
    const { data: session } = useSession();

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
                        <Link href='/api/auth/signout?callbackUrl=/'>
                            <FontAwesomeIcon
                                icon={faSignOut}
                                style={{ fontSize: 22, color: '#2c3035' }}
                                className={'fa-link'}
                            />
                        </Link>
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
        </nav>
    );
}