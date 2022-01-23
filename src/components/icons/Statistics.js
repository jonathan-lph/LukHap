import styles from '@styles/common/Icons.module.sass'

export default function Statistics(props) {
  return (
    <svg viewBox="0 0 24 24" className={styles.root} {...props}>
      <rect fill="none" height="24" width="24"/>
      <path d="M7.5,21H2V9h5.5V21z M14.75,3h-5.5v18h5.5V3z M22,11h-5.5v10H22V11z"/>
    </svg>
  )
}