import { Dialog } from "@components/common"
import { useTheme } from "@src/context/ThemeContext"
import styles from "@styles/dialog/SettingsDialog.module.sass"
import clsx from "clsx"
import { Fragment } from "react"

const OptionTile = ({ label, title, desc, value, onClick }) => {
  return (
    <Fragment>
      <div className={clsx({
        [styles.tile]: true,
        [styles.enabled]: value,
        [styles.disabled]: !value
      })} onClick={onClick}>
        {label}
      </div>
      <div className={styles.optionInfo}>
        <div className={styles.optionTitle}>
          {title}
        </div>
        <div className={styles.optionDesc}>
          {desc}
        </div>
      </div>
    </Fragment>
  )
}

export default function SettingsPanel({ hardMode, handleToggleHardMode, ...props}) {
  const { dark, toggleDarkMode } = useTheme()

  return (
    <Dialog {...props}>
      <h1 className={styles.title}>
        遊戲設定
      </h1>
      <div className={styles.options}>
        <OptionTile
          label="難"
          title="困難模式"
          desc="必須使用已顯示的提示。"
          value={hardMode}
          onClick={handleToggleHardMode}
        />
        {/* <OptionTile
          label="色"
          title="色弱模式"
          desc="使用高對比度顏色。"
          value={colorblind}
          onClick={toggleTheme('colorblind')}
        /> */}
        <OptionTile
          label="夜"
          title="黑夜模式"
          desc="使用黑夜模式。"
          value={dark}
          onClick={toggleDarkMode}
        />
      </div>
    </Dialog>
  )
}