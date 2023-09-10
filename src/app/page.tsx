import styles from './page.module.css'
import Header from '@/components/header/header';
import Footer from '@/components/footer';

import TopWave from '@/components/top-wave';
import BottomWave from '@/components/bottom-wave';

import Products from '@/components/home/products';

export default async function App() {
  return (
    <>
      <Header></Header>
      <div>
        <div className={styles.hero}>
          <TopWave height={'50px'}></TopWave>
          <div className={styles.content}>
            <h3>This is a paragraph of <span>buzzwords</span>, it may look cool but its <span>absolutely</span> jibberish</h3>

            <button className={[styles.cta, 'ambientKeyLight'].join(" ")}>
              <p>VIEW PLANS</p>
            </button>
          </div>
          <BottomWave height={'50px'} width={'calc(150% + 1.3px)'}></BottomWave>
        </div>

        <Products></Products>
      </div>
      <Footer></Footer>
    </>
  )
}
