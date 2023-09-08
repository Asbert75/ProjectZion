'use client';

import styles from '../page.module.css';
import Link from 'next/link';
import useUser from "@/store/useUser";

export default function DashboardHeader() {
    const username = useUser((state) => state.username);

    return (
        <div className={styles.header}>
            <Link href="/"><h2>Project<span>Zion</span></h2></Link>
            {username}
        </div>
    );
}