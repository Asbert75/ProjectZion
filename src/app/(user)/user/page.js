'use client';

import useUser from '@/store/useUser';

import styles from './page.module.css';

export default function Page() {
    const username = useUser((state) => state.username);

    return (
        <div className={styles.dashboard}>
            Welcome, {username}
        </div>
    );
}