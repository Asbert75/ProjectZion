'use client';

import styles from './hero.module.css'

import TopWave from '@/components/top-wave'
import BottomWave from '@/components/bottom-wave'

export default function Hero() {
    return (
        <div className={styles.hero}>
            <TopWave height={'50px'}></TopWave>
            <div className={styles.content}>
                <h3>This is a paragraph of <span>buzzwords</span>, it may look cool but its <span>absolutely</span> jibberish</h3>

                <button className={styles.cta}>
                    <p>VIEW PLANS</p>
                </button>
            </div>
            <BottomWave height={'50px'} width={'calc(150% + 1.3px)'}></BottomWave>
        </div>
    );
}