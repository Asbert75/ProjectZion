import styles from './page.module.css'
import Header from '../components/header';

export default function NotFound() {
    return (
        <>
            <Header></Header>
            <div className={styles.notFound}>
                <h1>404</h1>
                <p>The resource you were looking for could not be found</p>
            </div>
        </>
    );
}