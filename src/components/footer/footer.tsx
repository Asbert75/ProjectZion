import { getServerSession } from 'next-auth/next';

import styles from './footer.module.css'
export default async function Footer() {
    const session = await getServerSession();
    // console.log('Server Side', session);
    return (
        <div className={styles.footer}>
            <div>
                <div>
                </div>
            </div>
        </div>
    );
}