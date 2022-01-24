import styles from '@styles/main/Header.module.sass'
import clsx from 'clsx'
import { Settings, HelpOutline, Statistics, Cafe } from '@components/icons'
import { Fragment, useState } from 'react'
import { HelpDialog } from '@components/dialog'

export default function Header({ handleToggleSettings }) {

  const [open, setOpen] = useState({
    help: false
  })

  const handleOpen = key => e => {
    setOpen({...open, [key]: true})
  }

  const handleClose = key => e => {
    setOpen({...open, [key]: false})
  }

  return (
    <Fragment>
      <header className={styles.root}>
        <div className={styles.buttons}>
          <HelpOutline 
            className={styles.button}
            onClick={handleOpen('help')}
          />
          <Cafe 
            className={styles.button}
          />
        </div>
        <div className={styles.title}>
          Cidou 詞道
          <span className={styles.subtitle}>
            （遲到）
          </span>
        </div>
        <div className={styles.buttons}>
          <Statistics 
            className={styles.button}
          />
          <Settings 
            className={styles.button}
            onClick={handleToggleSettings}
          />
        </div>
      </header>

      <HelpDialog
        open={open.help}
        handleClose={handleClose('help')}
      />
    

    </Fragment>
  )
} 