import styles from '@styles/common/Header.module.sass'
import clsx from 'clsx'
import { Settings, HelpOutline, Statistics, Cafe } from '@components/icons'

export default function Header() {
  return (
    <header className={styles.root}>
      <div className={styles.buttons}>
        <HelpOutline/>
        <Cafe/>
      </div>
      <div className={styles.title}>
        Cidou 詞道
        <span className={styles.subtitle}>
          （遲到）
        </span>
      </div>
      <div className={styles.buttons}>
        <Statistics/>
        <Settings/>
      </div>
    </header>
  )
} 