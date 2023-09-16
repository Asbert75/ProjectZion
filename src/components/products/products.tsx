'use client';

import styles from './products.module.css'
import BottomWave from '../bottom-wave';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from 'gsap/all'

export default function Products() {
    const productList = [
        {
            name: 'Diamond Plan',
            enlarge: false,
            sellingPoints: [
                { value: 'Point 1', hasItem: true },
                { value: 'Point 1', hasItem: true },
                { value: 'Point 1', hasItem: true },
            ],
            price: '175'
        }, {
            name: 'Gold Plan',
            enlarge: true,
            sellingPoints: [
                { value: 'Point 1', hasItem: true },
                { value: 'Point 1', hasItem: true },
                { value: 'Point 1', hasItem: false },
            ],
            price: '50'
        }, {
            name: 'Silver Plan',
            enlarge: false,
            sellingPoints: [
                { value: 'Point 1', hasItem: true },
                { value: 'Point 1', hasItem: false },
                { value: 'Point 1', hasItem: false },
            ],
            price: '20'
        }
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.fromTo(`.${styles.productCard}`,
            {
                opacity: 0,
                y: 200
            },
            {
                scrollTrigger: `.${styles.productCard}`,
                opacity: 1,
                y: 0,
                duration: 0.5
            }
        )
    }, [])

    return (
        <div className={styles.products}>
            {productList.map((product, i) => {
                return (
                    <div key={i} className={[styles.productCard, product.enlarge ? styles.enlarge : ''].join(" ")}>
                        <div className={styles.header}>
                            <h3>{product.name}</h3>
                            <BottomWave height='20px' width='160%'></BottomWave>
                        </div>

                        <div className={styles.information}>
                            <ul>
                                {product.sellingPoints.map((sp, i) => (
                                    <li key={i}>
                                        {sp.hasItem ?
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                style={{ fontSize: 16 }}
                                            /> :
                                            <FontAwesomeIcon
                                                icon={faTimesCircle}
                                                style={{ fontSize: 16 }}
                                            />
                                        }
                                        <p>{sp.value}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.pricing}>
                            {/* <TopWave height='20px'></TopWave> */}
                            <h4>€{product.price}<span>/mo</span></h4>
                            <button className={'btn btnSecondary'}>BUY NOW</button>
                        </div>
                    </div>)
            })}
        </div>
    )
}
