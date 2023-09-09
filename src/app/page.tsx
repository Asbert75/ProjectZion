import styles from './page.module.css'
import Header from '@/components/header';

import TopWave from '@/components/top-wave';
import BottomWave from '@/components/bottom-wave';

export default async function App() {
  return (
    <>
      <Header></Header>
      <div>
        <div className={styles.hero}>
          <TopWave height={'50px'}></TopWave>
          <div className={styles.content}>
            <h3>Say hello to <span>Zion</span>, a new fintech program that will <span>revolutionize</span> your workflow</h3>

            <button className={[styles.cta, 'ambientKeyLight'].join(" ")}>
              <p>VIEW PLANS</p>
            </button>
          </div>
          <BottomWave height={'50px'} width={'calc(150% + 1.3px)'}></BottomWave>
        </div>

        <div className={[styles.placeholder, 'ml2', 'mr2', 'roundedBox', 'keyLight'].join(" ")}></div>
      </div>
    </>
  )
}
