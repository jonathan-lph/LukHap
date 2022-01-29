import { Fragment, useEffect} from 'react'
import { Settings, HelpOutline, Statistics, Info, Logo } from '@components/icons'
import { HelpDialog, InfoDialog, SettingsDialog, StatisticsDialog } from '@components/dialog'
import styles from '@styles/main/Header.module.sass'

export default function Header({ 
  dialog,
  handleToggleDialog, 
  guessed,
  ending,
  answer,
  evaluations,
  hardMode,
  handleToggleHardMode,
}) {

  useEffect(() => {
    const local = localStorage.getItem('gameState')
    if (!local) handleToggleDialog('help')()
  }, [])

  return (
    <Fragment>
      
      <header className={styles.root}>
        <div className={styles.buttons}>
          <HelpOutline 
            className={styles.button}
            onClick={handleToggleDialog('help')}
          />
          <Info 
            className={styles.button}
            onClick={handleToggleDialog('info')}
          />
        </div>
        <div className={styles.logoDiv}>
          <Logo className={styles.logo}/>
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
        open={dialog.help}
        handleClose={handleToggleDialog('help')}
      />

      <InfoDialog
        open={dialog.info}
        handleClose={handleToggleDialog('info')}
        guessed={guessed}
      />

      <SettingsDialog
        open={dialog.settings}
        handleClose={handleToggleDialog('settings')}
        hardMode={hardMode}
        handleToggleHardMode={handleToggleHardMode}
      />

      <StatisticsDialog
        open={dialog.statistics}
        handleClose={handleToggleDialog('statistics')}
        evaluations={evaluations}
        ending={ending}
        answer={answer}
      />

    </Fragment>
  )
} 