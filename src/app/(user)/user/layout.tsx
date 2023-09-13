'use client';

import styles from './page.module.css'

import Header from '@/components/header/header'
import TopWave from '@/components/top-wave'

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { usePathname, useRouter } from 'next/navigation';

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(`.${styles.content}`,
            {
                opacity: 0,
                y: 100
            },
            {
                scrollTrigger: `.${styles.content}`,
                opacity: 1,
                y: 0,
                ease: 'power1',
                duration: 1
            }
        )
    }, [])

    const routes = [
        {
            path: '/user',
            title: 'Settings'
        }, {
            path: '/user/loadouts',
            title: 'Loadouts'
        }, {
            path: '/user/purchasehistory',
            title: 'Purchase History'
        },
    ]

    return (
        <>
            <Header></Header>
            <div className={styles.container}>
                <TopWave height={'50px'}></TopWave>
                <div className={styles.content}>
                    <ul className={styles.sideMenu}>
                        {routes.map(route => {
                            return (
                                <li key={route.path} className={pathname === route.path ? styles.active : ''} onClick={() => router.push(route.path)}>
                                    <p>{route.title}</p>
                                </li>
                            )
                        })}
                    </ul>
                    <div className={styles.page}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
