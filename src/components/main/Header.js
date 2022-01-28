import styles from '@styles/main/Header.module.sass'
import clsx from 'clsx'
import { Settings, HelpOutline, Statistics, Info } from '@components/icons'
import { Fragment, useEffect, useState } from 'react'
import { HelpDialog, InfoDialog } from '@components/dialog'

export default function Header({ handleToggleDialog, guessed }) {

  const [open, setOpen] = useState({
    help: false,
    info: false
  })

  const handleOpen = key => e => {
    setOpen({...open, [key]: true})
  }

  const handleClose = key => e => {
    setOpen({...open, [key]: false})
  }

  useEffect(() => {
    const local = localStorage.getItem('gameState')
    if (!local) handleOpen('help')()
  }, [])

  return (
    <Fragment>
      <header className={styles.root}>
        <div className={styles.buttons}>
          <HelpOutline 
            className={styles.button}
            onClick={handleOpen('help')}
          />
          <Info 
            className={styles.button}
            onClick={handleOpen('info')}
          />
        </div>
        <div className={styles.title}>
          詞道
          {/* <span className={styles.subtitle}>
            （遲到）
          </span> */}
        </div>
        <div className={styles.buttons}>
          <Statistics 
            className={styles.button}
            onClick={handleToggleDialog('statistics')}
          />
          <Settings 
            className={styles.button}
            onClick={handleToggleDialog('settings')}
          />
        </div>
      </header>

      <HelpDialog
        open={open.help}
        handleClose={handleClose('help')}
      />

      <InfoDialog
        open={open.info}
        handleClose={handleClose('info')}
        guessed={guessed}
      />

    </Fragment>
  )
} 