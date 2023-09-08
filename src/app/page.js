'use client';

import styles from './page.module.css';

import { DM_Sans } from 'next/font/google';
const dmSans = DM_Sans({ subsets: ['latin'] });

import Header from '@/components/header';

export default function Home() {
    return (
        // <AuthProvider>
        <>
            <Header></Header>
            <div>
                <div className={[styles.placeholderDark].join(" ")}>
                    <h3>Say hello to <span>Zion</span>, a new fintech program that will <span>revolutionize</span> your workflow</h3>

                    <button className={[styles.actionbutton, 'ambientKeyLight'].join(" ")}>
                        <p className={dmSans.className}>VIEW PLANS</p>
                    </button>
                </div>

                <div className={[styles.placeholder, 'ml2', 'mr2', 'roundedBox', 'keyLight'].join(" ")}></div>
            </div>
        </>
        // </AuthProvider>
    )
}
