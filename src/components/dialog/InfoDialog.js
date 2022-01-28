import { Dialog } from '@components/common'
import styles from '@styles/dialog/InfoDialog.module.sass'
import { Fragment } from 'react'
import { External, GitHub } from '@components/icons'

const links = [{
  label: '遊戲原程式碼',
  name: 'CiDou 詞道',
  github: 'https://github.com/jonathan-lph/cidou'
}, {
  label: '詞源及粵拼',
  name: 'Rime 粵拼方案',
  github: 'https://github.com/rime/rime-cantonese',
}, {
  label: '原遊戲',
  name: 'Wordle',
  external: 'https://www.powerlanguage.co.uk/wordle/',
}, {
  label: '遊戲啟發',
  name: 'ZiDou 字道',
  external: 'https://chaaklau.github.io/zidou/',
}]

const initials = {
  LSHK: [
    ['b', 'p', 'm', 'f'],
    ['d', 't', 'n', 'l'],
    ['g', 'k', 'ng', 'h'],
    ['gw', 'kw', 'w', 'j'], 
    ['z', 'c', 's', '∅'],
  ],
  words: [
    ['巴', '怕', '媽', '花'],
    ['打', '他', '拿', '啦'],
    ['家', '卡', '牙', '蝦'],
    ['瓜', '跨', '娃', '也'],
    ['渣', '叉', '沙', '啊'],
  ]
}

const vowelsMain = {
  LSHK: [
    ['aa', 'a', 'e', 'i'],
    ['o', 'oe', 'eo'],
    ['u', 'yu', '∅'],
  ],
  words: [
    ['沙', '新', '些', '詩'],
    ['疏', '靴', '詢'],
    ['夫', '書', '唔']
  ]
}

const vowelsEnd = {
  LSHK: [
    ['i', 'u'],
    ['m', 'n', 'ng'],
    ['p', 't', 'k']
  ],
  words: [
    ['西', '收'],
    ['心', '新', '生'],
    ['濕', '失', '塞']
  ]
}

export default function InfoDialog(props) {

  return (
    <Dialog
      className={styles.root} 
      {...props}
      title="資料"
    >
      <div className={styles.title}>
        聲母
      </div>
      <dl className={styles.table}>
        {initials.words.map((arr, i) => 
          <div key={`initials-${i}`} className={styles.row}>
            {arr.map((example, j) => 
              <Fragment key={j}>
                <dt>{initials.LSHK[i][j]}</dt>
                <dd>{example}</dd>
              </Fragment>
            )}
          </div>
        )}
      </dl>
      <div className={styles.title}>
        韻腹、韻尾
      </div>
      <dl className={styles.table}>
        {vowelsMain.words.map((arr, i) => 
          <div key={`initials-${i}`} className={styles.row}>
            {arr.map((example, j) => 
              <Fragment key={j}>
                <dt>{vowelsMain.LSHK[i][j]}</dt>
                <dd>{example}</dd>
              </Fragment>
            )}
          </div>
        )}
        {vowelsEnd.words.map((arr, i) => 
          <div key={`initials-${i}`} className={styles.row}>
            {arr.map((example, j) => 
              <Fragment key={j}>
                <dt>-{vowelsEnd.LSHK[i][j]}</dt>
                <dd>{example}</dd>
              </Fragment>
            )}
          </div>
        )}
      </dl>
      <div className={styles.title}>
        連結
      </div>
      <div className={styles.links}>
        {links.map(({label, name, external, github}) => 
          <div key={label} className={styles.link}>
            <div className={styles.linkInfo}>
              <div className={styles.name}>{name}</div>
              <div className={styles.label}>{label}</div>
            </div>
            <div>
              {external && 
                <a href={external} target="_blank" rel="noreferrer">
                  <External className={styles.linkIcon}/>
                </a>
              }
              {github && 
                <a href={github} target="_blank" rel="noreferrer">
                  <GitHub className={styles.linkIcon}/>
                </a>
              }
            </div>
          </div>
        )}
      </div>
    </Dialog>
  )
}