'use client';

// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically since it's already imported above
config.autoAddCss = false;

import styles from './header.module.css'

import Link from 'next/link'
import Image from 'next/image'

import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'


export default function Header() {
    const router = useRouter();
    const { data: session } = useSession({
        required: true,
        // onUnauthenticated() { Automatically redirects when navigating to this route if the user is not signed in
        //     redirect('/api/auth/signin?callbackUrl=/client')
        // }
    })

    function onSignout() {
        console.log('Signing out')
        router.push('/api/auth/signout')
    }

    return (
        <nav className={[styles.navigation, 'pl5', 'pr5', 'pt2', 'pb2', 'keyLight'].join(" ")}>
            <div>
                <Link href="/"><h2>Project<span>Zion</span></h2></Link>
            </div>
            {session ?
                (
                    <div className={[styles.usersettings, 'hoverLink'].join(" ")}>
                        {session?.user?.image ?
                            <Image src={session?.user?.image} alt="User" width={22} height={22}></Image> :
                            <FontAwesomeIcon
                                icon={faUserCircle}
                                style={{ fontSize: 22, color: '#2c3035' }}
                            />
                        }
                        <p>{session?.user?.name}</p>
                        <p onClick={() => onSignout()}>Sign Out</p>
                    </div>
                ) :
                (
                    <div>
                        <Link href="/login">Sign In</Link>
                    </div>
                )
            }
        </nav>
    );
}