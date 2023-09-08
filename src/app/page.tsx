import styles from './page.module.css'
import Header from '@/components/header';

export default async function App() {
  return (
    <main>
      <Header></Header>
      <div>
        <div className={[styles.placeholderDark].join(" ")}>
          <h3>Say hello to <span>Zion</span>, a new fintech program that will <span>revolutionize</span> your workflow</h3>

          <button className={[styles.actionbutton, 'ambientKeyLight'].join(" ")}>
            {/* <p className={dmSans.className}>VIEW PLANS</p> */}
            <p>VIEW PLANS</p>
          </button>
        </div>

        <div className={[styles.placeholder, 'ml2', 'mr2', 'roundedBox', 'keyLight'].join(" ")}></div>
      </div>
    </main>
  )
}
