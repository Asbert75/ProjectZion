import styles from '@/app/page.module.css';
import Header from '@/components/header/header';
import TopWave from '@/components/top-wave';
import BottomWave from '@/components/bottom-wave';

export default function Unauthorized() {
    return (
        <>
            <Header></Header>
            <div className={styles.notFound}>
                <TopWave></TopWave>
                <h1>403</h1>
                <p>You are not authorized to visit that page.</p>
                <BottomWave></BottomWave>
            </div>
        </>
    );
}