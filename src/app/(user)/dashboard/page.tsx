'use client';

import styles from './dashboard.module.css';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
    const { data: session } = useSession();

    return (
        <div className={styles.box}>
            Welcome, {session?.user.username}
        </div>
    );
}