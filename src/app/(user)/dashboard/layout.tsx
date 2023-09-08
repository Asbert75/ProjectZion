import styles from './page.module.css';
import DashboardHeader from './components/dashboard-header';

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={styles.container}>
            <DashboardHeader></DashboardHeader>
            {children}
        </div>
    )
}
