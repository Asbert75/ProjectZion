'use client';

import styles from '../page.module.css';
import Link from 'next/link';

import { useSession } from 'next-auth/react';

export default function DashboardHeader() {
    const { data: session } = useSession();

    return (
        <div className={styles.header}>
            <Link href="/"><h2>Project<span>Zion</span></h2></Link>
            {session?.user?.username}
        </div>
    );
}