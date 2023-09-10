import styles from './page.module.css'
import Header from '@/components/header/header';
import TopWave from '@/components/top-wave';
import BottomWave from '@/components/bottom-wave';

export default function NotFound() {
    return (
        <>
            <Header></Header>
            <div className={styles.notFound}>
                <TopWave height={'50px'}></TopWave>
                <h1>404</h1>
                <p>The resource you were looking for could not be found</p>
                <BottomWave height={'100px'} width={'calc(105% + 1.3px)'}></BottomWave>
            </div>
        </>
    )
}
