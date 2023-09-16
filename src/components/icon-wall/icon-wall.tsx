'use client';

import styles from './icon-wall.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard, faHistory, faUsers, faMeteor, faSearchPlus, faSpaceShuttle } from '@fortawesome/free-solid-svg-icons';

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function IconWall() {
    const reasons = [
        {
            icon: faHistory,
            header: 'Ullamcorper donec',
            text: 'Praesent laoreet velit quis nunc ullamcorper, id pretium dui dictum'
        }, {
            icon: faDashboard,
            header: 'Corpus Victus',
            text: 'Donec cursus ipsum sed viverra bibendum'
        }, {
            icon: faUsers,
            header: 'Aurora Borealis',
            text: 'Duis non neque orci. Praesent nisl nunc, tristique non libero vel'
        }, {
            icon: faSpaceShuttle,
            header: 'Semper Fi',
            text: 'Interdum et malesuada fames ac ante ipsum primis in faucibus'
        }, {
            icon: faMeteor,
            header: 'Vini Vici',
            text: 'Curabitur in leo at eros malesuada'
        }, {
            icon: faSearchPlus,
            header: 'Invictus Realis',
            text: 'Cursus neque praesent, curabitur fames ac primis id pretium'
        }
    ];

    gsap.registerPlugin(ScrollTrigger)
    useEffect(() => {
        gsap.fromTo(`.${styles.linkWall}`,
            {
                opacity: 0,
                z: 200
            },
            {
                scrollTrigger: `.${styles.linkWall}`,
                // start: 'top bottom',
                opacity: 1,
                z: 0,
                duration: 1,
                delay: 0.25
            }
        )
    }, [])

    return (
        <div className={styles.linkWall}>
            <h2>Vitae nurta?</h2>
            <div className={styles.wall}>
                {reasons.map(reason => {
                    return <div key={reason.header} className={styles.item}>
                        <FontAwesomeIcon icon={reason.icon} />
                        <h3>{reason.header}</h3>
                        <p>{reason.text}</p>
                    </div>
                })}
            </div>
        </div>
    );
}