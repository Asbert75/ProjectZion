import styles from '@/app/page.module.css';
import Header from '@/components/header';

export default function Unauthorized() {
    return (
        <>
            <Header></Header>
            <div className={styles.notFound}>
                <h1>403</h1>
                <p>You are not authorized to visit that page.</p>
            </div>
        </>
    );
}