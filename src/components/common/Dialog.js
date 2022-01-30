import clsx from 'clsx'
import { createPortal } from 'react-dom'
import { Close } from '@components/icons'
import styles from '@styles/common/Dialog.module.sass'

export default function Dialog({ open, title, children, handleClose, className, noPadding }) {

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
          <div className={clsx(!noPadding && styles.content)}>
            {children}
          </div>
        </dialog>
      </div>
    </div>
  , document.getElementById('themed-app'))
}