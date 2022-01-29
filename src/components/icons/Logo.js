
import styles from '@styles/common/Icons.module.sass'
import clsx from 'clsx'

export default function Logo({className, ...props}) {
  return (
    <svg viewBox="0 0 49.33 24" className={clsx(styles.root, className && className)} {...props}>
      <path d="M2.66,11.54h7.53v1.74L8.25,23.87H0v-5Zm20.78-1.43H.05V2.68H7V.2h9.17V2.68h7.3Zm0,8.73v5H15.24L13.05,13.28V11.54h7.53Z"/>
      <path d="M49.33,3.75v6.9H47.8V12H26.73V10.65H25.22V3.75L33.29,0h7.56ZM25.91,12.92H48.59V24H25.91ZM33.6,19h7.12V17.8H33.6Zm3-12.9-2.45,1h6.26l-2.53-1Z"/>
    </svg>
  )
}