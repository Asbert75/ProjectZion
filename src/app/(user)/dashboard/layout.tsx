import styles from './dashboard.module.css';

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
                        ProjectZion
                    </li>

                    <li>
                        User Logo
                    </li>

                    <li>
                        Menu Choice
                    </li>

                    <li>
                        Menu Choice
                    </li>
                </ul>
            </div>
            <div className={styles.view}>
                {children}
            </div>
        </div>
    )
}
