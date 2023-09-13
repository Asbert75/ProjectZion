import styles from './dashboard.module.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn, faCalendarDays, faDashboard, faGears } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link'

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={styles.container}>
            <div className={styles.navigation}>
                <ul>
                    <li>
                        <Link href="/">
                            <FontAwesomeIcon
                                icon={faChartColumn}
                                style={{ fontSize: 32 }}
                            />
                        </Link>
                    </li>

                    <li>
                        <Link href="/">
                            <FontAwesomeIcon
                                icon={faCalendarDays}
                                style={{ fontSize: 32 }}
                            />
                        </Link>
                    </li>

                    <li>
                        <Link href="/">
                            <FontAwesomeIcon
                                icon={faGears}
                                style={{ fontSize: 32 }}
                            />
                        </Link>
                    </li>

                    <li>
                        <Link href="/">
                            <FontAwesomeIcon
                                icon={faDashboard}
                                style={{ fontSize: 32 }}
                            />
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={styles.view}>
                {children}
            </div>
        </div>
    )
}
