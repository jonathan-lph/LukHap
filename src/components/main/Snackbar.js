import styles from '@styles/main/Snackbar.module.sass'
import clsx from 'clsx'

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