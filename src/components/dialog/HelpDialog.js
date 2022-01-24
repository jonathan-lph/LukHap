import { Dialog } from '@components/common'
import styles from '@styles/dialog/HelpDialog.module.sass'
import clsx from 'clsx'

const Example = ({ list, word, type }) => {

  const index = type === 'absent' ? 4
    : type === 'present' ? 2
    : type === 'correct' ? 0 : null

  return (
    <figure className={styles.example}>
      <div className={styles.tiles}>
        {list.map((phonemes, idx) => 
          <div className={clsx({
            [styles.tile]: true,
            [styles.absent]: type === 'absent' && idx === index,
            [styles.present]: type === 'present' && idx === index,
            [styles.correct]: type === 'correct' && idx === index,
          })}>
            {phonemes}
          </div>
        )}
      </div>
      <figcaption className={styles.description}>
        <strong>{word}</strong>：「{list[index].toUpperCase()}」
        { type === 'absent' ? '完全唔喺依個字度。'
        : type === 'present' ? '喺個字度但唔啱位。'
        : type === 'correct' ? '喺個字度而且啱位。'
        : null}
      </figcaption>
    </figure>
  )
}


export default function HelpDialog(props) {
  return (
    <Dialog className={styles.root} {...props}>
      <h1 className={styles.title}>
        遊戲玩法
      </h1>
      <p> 
        六次機會裡面，要估中一個詞兩個字嘅粵拼。每次估都要入曬六個音，包括聲母、韻腹、韻尾。如果冇其中一部分，就入「-」。
      </p>
      <p>
        入完就撳「輸入」啦！睇顏色就知自己中咗幾多個㗎啦。
      </p>
      <div className={styles.examples}>
        <Example 
          list={["f", "a", "i", "j", "i", "m"]}
          word="肺炎"
          type="correct"
        />
        <Example 
          list={["h", "oe", "ng", "g", "o", "ng"]}
          word="香港"
          type="present"
        />
        <Example 
          list={["z", "i", "ng", "f", "u", "-"]}
          word="政府"
          type="absent"
        />
      </div>
    </Dialog>
  )
}