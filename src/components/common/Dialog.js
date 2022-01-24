import styles from '@styles/common/Dialog.module.sass'
import { createPortal } from 'react-dom'
import { Close } from '@components/icons'

export default function Dialog({ open, children, handleClose }) {

  if (!open) return null
  return createPortal(
    <div className={styles.backdrop} >
      <div className={styles.inner} onClick={handleClose}>
        <dialog className={styles.root} open={open} onClick={e => e.stopPropagation()}>
          <Close className={styles.close} onClick={handleClose}/>
          {children}
        </dialog>
      </div>
    </div>
  , document.getElementById('themed-app'))
}