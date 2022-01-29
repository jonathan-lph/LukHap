import clsx from 'clsx'
import styles from '@styles/main/Display.module.sass'

export default function Display({ inputs, evaluations, currRow, error }) {
  return (
    <main className={styles.root}>
      <div className={styles.board}>
        {inputs.map((row, i) =>
          <div 
            className={styles.row} 
            key={`row-${i}`}
          >
            {row.map((input, j) => 
              <div 
                key={`box-${i}-${j}`}
                className={clsx({
                  [styles.tile]: true,
                  [styles.entered]: input !== '' && !evaluations[i],
                  [styles.absent]: evaluations[i]?.[j] === 'absent',
                  [styles.present]: evaluations[i]?.[j] === 'present',
                  [styles.correct]: evaluations[i]?.[j] === 'correct',
                  [styles.error]: error && currRow === i,
                })}
              >
                {input}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}