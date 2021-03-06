import clsx from "clsx"
import { Fragment } from "react"
import { useTheme } from "@context/ThemeContext"
import { Dialog } from "@components/common"
import styles from "@styles/dialog/SettingsDialog.module.sass"

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
      <div className={styles.optionInfo} onClick={onClick}>
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
    <Dialog 
      {...props}
      title="遊戲設定"
    >
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
          desc="＊Safari 用戶請重載網頁。"
          value={dark}
          onClick={toggleDarkMode}
        />
      </div>
    </Dialog>
  )
}