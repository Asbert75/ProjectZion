'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import styles from './roulette.module.scss'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

export default function Roulette() {
    const wrapper = useRef<HTMLDivElement>(null)
    const wheel = useRef<HTMLDivElement>(null)
    const selector = useRef<HTMLDivElement>(null)

    const rows = [...Array(29)]
    const [winningHistory, setWinningHistory] = useState<number[]>([])
    const [timer, setTimer] = useState('')
    const [countdownLength, setCountdownLength] = useState(5000)
    const [fillPercentage, setFillPercentage] = useState(0)
    const [isRolling, setIsRolling] = useState(false)

    useEffect(() => {
        startCountdown()
    }, [])

    function startCountdown() {
        if (timer !== '' || isRolling) return;
        let countdownDate = new Date().getTime() + countdownLength

        var updateTime = setInterval(() => {
            var now = new Date().getTime()

            var difference = countdownDate - now
            var timer = (difference % (1000 * 60) / 1000)
            if (timer < 0) timer = 0
            setTimer(timer.toFixed(2))

            if (difference < 100) setFillPercentage(0) // Fixes an issue of rounding where the bar ends up at ~0.03% and doesn't disappear
            else setFillPercentage((difference / countdownLength) * 100)

            if (difference <= 0) {
                clearInterval(updateTime)
                spin(Math.floor(Math.random() * 14))

                setTimeout(() => {
                    setTimer('')
                }, 500)
            }
        })
    }

    function spin(winningNumber: number) {
        setIsRolling(true)

        if (!wheel || !wheel.current) return;
        let order = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4],
            position = order.indexOf(winningNumber);

        //determine position where to land
        var rows = 12,
            card = 75 + 3 * 2,
            landingPosition = (rows * 15 * card) + (position * card);

        var randomize = Math.floor(Math.random() * 75) - (75 / 2);

        landingPosition = landingPosition + randomize;

        var object = {
            x: Math.floor(Math.random() * 50) / 100,
            y: Math.floor(Math.random() * 20) / 100
        };

        wheel.current.style.transform = `translate3d(-${landingPosition}px, 0px, 0px)`
        wheel.current.style.transitionTimingFunction = `cubic-bezier(0, ${object.x}, ${object.y}, 1)`
        wheel.current.style.transitionDuration = '6s'

        setTimeout(function () {
            if (!wheel || !wheel.current) return;
            wheel.current.style.transitionTimingFunction = ''
            wheel.current.style.transitionDuration = ''

            var resetTo = -(position * card + randomize);
            wheel.current.style.transform = `translate3d(${resetTo}px, 0px, 0px)`

            setWinningHistory(currentHistory => [...currentHistory, winningNumber]);
            setTimeout(() => {
                setIsRolling(false)
                startCountdown()
            }, 2000)
        }, 6 * 1000)
    }

    return (
        <section className={styles.roulette}>
            <div className={styles.container}>
                <div className={styles.history}>
                    <p className='text-muted'>History:</p>
                    {winningHistory.map((n, i) => {
                        return (
                            <div key={i} style={{fontSize: '0.5rem'}}
                                className={n === 0 ? `${styles.card} ${styles.green}` : (n > 0 && n < 8) ? `${styles.card} ${styles.red}` : `${styles.card} ${styles.black}`}>
                                    {n}
                            </div>
                        )
                    })}
                </div>
                <div className={styles.wrapper} ref={wrapper}>
                    <div className={styles.shadow}></div>
                    <div className={styles.shadowreverse}></div>
                    <div className={styles.selector} ref={selector}></div>
                    <div className={styles.wheel} ref={wheel}>
                        {rows.map((_, i) => {
                            return (
                                <div key={i} className={styles.row}>
                                    <div className={[styles.card, styles.red].join(" ")}></div>
                                    <div className={[styles.card, styles.black].join(" ")}></div>
                                    <div className={[styles.card, styles.red].join(" ")}></div>
                                    <div className={[styles.card, styles.black].join(" ")}></div>
                                    <div className={[styles.card, styles.red].join(" ")}></div>
                                    <div className={[styles.card, styles.black].join(" ")}></div>
                                    <div className={[styles.card, styles.red].join(" ")}></div>
                                    <div className={[styles.card, styles.green].join(" ")}></div>
                                    <div className={[styles.card, styles.black].join(" ")}></div>
                                    <div className={[styles.card, styles.red].join(" ")}></div>
                                    <div className={[styles.card, styles.black].join(" ")}></div>
                                    <div className={[styles.card, styles.red].join(" ")}></div>
                                    <div className={[styles.card, styles.black].join(" ")}></div>
                                    <div className={[styles.card, styles.red].join(" ")}></div>
                                    <div className={[styles.card, styles.black].join(" ")}></div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className={styles.countdown}>
                    {timer && <div className={styles.timer}>
                        <h4>ROLLING IN</h4><h4>{timer}</h4>
                    </div>}
                    <div className={styles.progressBar}>
                        <div
                            className={`${styles.fill} ${Number(timer) < 2 ? styles.urgent : Number(timer) < 5 ? styles.soon : ''}`}
                            style={{ width: `${fillPercentage}%` }}
                        ></div>
                    </div>
                </div>

                <div className={`${styles.betting} ${isRolling ? styles.disabled : ''}`}>
                    <div className={styles.red}>
                        <button>Place Bet</button>
                    </div>
                    <div className={styles.green}>
                        <button>Place Bet</button>
                    </div>
                    <div className={styles.black}>
                        <button>Place Bet</button>
                    </div>
                </div>
            </div>
        </section >
    );
}