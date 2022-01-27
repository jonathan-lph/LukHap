import styles from '@styles/main/Keyboard.module.sass'
import clsx from 'clsx'

const initials = [
  'b', 'p', 'm', 'f',
  'g', 'k', 'ng', 'h',
  'z', 'c', 
  'd', 't', 'n', 'l',
  'gw', 'kw', 'w', 'j',
  '/', 's', '/' 
]

const vowelsMain = [
  '',
  'aa', 'a', 'e', 'i', 'o',
  'oe', 'eo', 'u', 'yu', 
  ''
]

const vowelsEnd = [
  'i', 'p',
  'u', 't',
  'm', 'k',
  'n', '無尾',
  'ng', '無韻',
]

export default function Keyboard({ handleSelect, handleDelete, handleSubmit, guessed }) {

  return (
    <div className={styles.root}>
      <div className={styles.inputs}>
        {initials
        .concat(vowelsMain)
        .map((input, idx) => {
          if (input === '')  return <div key={`spacer-${idx}`}/>
          if (input === '/') return <div key={`spacer-${idx}`} className={styles.spacer}/>
          return (
            <button 
              key={`${input}-${idx}`}
              className={clsx({
                [styles.button]: true,
                [styles.absent]: guessed[input] === 'absent',
                [styles.present]: guessed[input] === 'present',
                [styles.correct]: guessed[input] === 'correct',
              })}
              onClick={handleSelect(input)}
            >
              {input}
            </button>
          )
        })}
        <button 
          className={clsx(styles.button, styles.subButton)}
          onClick={handleSubmit}
        >
          Enter
        </button>
        <button 
          className={clsx({
            [styles.button]: true,
            [styles.emptyButton]: true,
            [styles.absent]: guessed['-'] === 'absent',
            [styles.present]: guessed['-'] === 'present',
            [styles.correct]: guessed['-'] === 'correct',
          })}
          onClick={handleSelect('-')}
        >
          -
        </button>
        <button 
          className={clsx(styles.button, styles.bsButton)}
          onClick={handleDelete}
        >
          ⌫
        </button>
      </div>
      
    </div>
  )
}