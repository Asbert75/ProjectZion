import VerticalSpinner from '@/components/vertical-spinner';
import styles from './page.module.css';

export default function Loading() {
    return <>
        <div className={styles.pageLoading}>
            <VerticalSpinner></VerticalSpinner>
        </div>
    </>
}