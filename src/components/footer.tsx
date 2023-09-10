'use client';

import styles from './footer.module.css'

import Link from 'next/link'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    function scrollTop() {
        console.log('scroll');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className={styles.footer}>
            <div>
                <div>
                </div>

                <div className={styles.navigator} onClick={scrollTop}>
                    <div>
                        <FontAwesomeIcon
                            icon={faArrowUp}
                            style={{ fontSize: 22, color: '#2c3035' }}
                        />
                        <p>Go to top</p>
                    </div>
                </div>
            </div>
        </div>
    );
}