'use client';

// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically since it's already imported above
config.autoAddCss = false;

import styles from './header.module.css'

import Link from 'next/link';
import { usePathname } from 'next/navigation'

import useUser from "@/store/useUser";

export default function Header() {
    const pathname = usePathname();
    const isActive = pathname === '/login';
    const isLoggedIn = useUser((state) => state.isLoggedIn);
    const logout = useUser((state) => state.logout);
    const username = useUser((state) => state.username);

    return (
        <nav className={[styles.navigation, 'pl5', 'pr5', 'pt2', 'pb2', 'keyLight'].join(" ")}>
            <div>
                <Link href="/"><h2>Project<span>Zion</span></h2></Link>
            </div>
            {isLoggedIn ?
                (
                    <div className={[styles.usersettings, 'hoverLink'].join(" ")}>
                        <FontAwesomeIcon
                            icon={faUserCircle}
                            style={{ fontSize: 22, color: '#2c3035' }}
                        />
                        <p>{username}</p>
                        <p onClick={() => logout()}>Sign Out</p>
                    </div>
                ) :
                (
                    <div className={[]}>
                        {isActive ? null : <Link href="/login">Sign In</Link>}
                    </div>
                )
            }
        </nav>
    );
}