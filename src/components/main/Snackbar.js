import clsx from 'clsx'
import styles from '@styles/main/Snackbar.module.sass'

export default function Snackbar({error, success}) {
  return (
    <div className={clsx({
      [styles.root]: true,
      [styles.error]: error,
      [styles.success]: success,
    })}>
      {success || error}
    </div>
  )
}