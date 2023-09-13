import styles from './page.module.css'
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import Hero from '@/components/hero/hero';
import Products from '@/components/home/products';
import IconWall from '@/components/icon-wall/icon-wall';

import Image from 'next/image';


export default function App() {
  return (
    <>
      <Header></Header>
      <div>
        <Hero></Hero>

        <div className={styles.information}>
          <h2>Curabitur in leo at eros malesuada</h2>
          <p>Praesent laoreet velit quis nunc ullamcorper, id pretium dui dictum. Morbi convallis ligula eget ex ultrices lacinia.
            Donec cursus ipsum sed viverra bibendum. Duis non neque orci. Praesent nisl nunc, tristique non libero vel, suscipit efficitur elit.
            Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
        </div>

        <Products></Products>

        <div className={styles.informationDark}>
          <div>
            <Image src={'/images/bottle.png'} alt='Hej' width={250} height={250} />
            <p>Praesent laoreet velit quis nunc ullamcorper, id pretium dui dictum. Morbi convallis ligula eget ex ultrices lacinia.
              Donec cursus ipsum sed viverra bibendum. Duis non neque orci. Praesent nisl nunc, tristique non libero vel, suscipit efficitur elit.
              Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
          </div>
        </div>

        <IconWall></IconWall>

      </div>
      <Footer></Footer>
    </>
  )
}
