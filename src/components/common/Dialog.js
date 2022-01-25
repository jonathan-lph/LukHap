import styles from '@styles/common/Dialog.module.sass'
import { createPortal } from 'react-dom'
import { Close } from '@components/icons'
import clsx from 'clsx'

export default function Dialog({ open, title, children, handleClose, className }) {

  if (!open) return null
  return createPortal(
    <div className={styles.backdrop}>
      <div className={styles.inner} onClick={handleClose}>
        <dialog 
          open={open}
          className={clsx(styles.root, className && className)} 
          onClick={e => e.stopPropagation()}
        >
          <Close className={styles.close} onClick={handleClose}/>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.content}>
            {children}
          </div>
        </dialog>
      </div>
    </div>
  , document.getElementById('themed-app'))
}