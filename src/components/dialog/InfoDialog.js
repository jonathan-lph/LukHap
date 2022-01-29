import { Dialog } from '@components/common'
import styles from '@styles/dialog/InfoDialog.module.sass'
import { Fragment } from 'react'
import { External, GitHub } from '@components/icons'

const links = [{
  label: '遊戲原程式碼',
  name: 'LukHap 六合',
  github: 'https://github.com/jonathan-lph/lukhap'
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
}, {
  label: '漢語多功能字庫',
  name: '粵語音節表',
  external: 'https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/syllables.php'
}, {
  label: 'Google Docs',
  name: '私隱政策',
  external: 'https://docs.google.com/document/d/1uxALGuP0aYQrw_S5tS5zCEju0p3-rN82SYZX9T8l664/edit?usp=sharing'
}]

const tables = [{
  type: '聲母',
  list: [{
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
    ],

  }]
}, {
  type: '韻腹、韻尾',
  list: [{
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
  }, {
    LSHK: [
      ['i', 'u'],
      ['m', 'n', 'ng'],
      ['p', 't', 'k']
    ],
    words: [
      ['西', '收'],
      ['心', '新', '生'],
      ['濕', '失', '塞']
    ],
    prefix: '-'
  }]
}]

export default function InfoDialog({ guessed, ...props }) {
  return (
    <Dialog
      className={styles.root} 
      {...props}
      title="資料"
    >
      {tables.map(({type, list}) => 
        <Fragment key={type}>
        <div className={styles.title}>
          {type}
        </div>
        <dl className={styles.table}>
        {list.map(({LSHK, words, prefix}) => 
          words.map((arr, i) => 
            <div key={`wordPair-${i}`} className={styles.column}>
            {arr.map((example, j) => {
              const phonemes = LSHK[i][j]
              const classes = guessed[phonemes !== '∅' ? phonemes : '-'] 
              ? styles[guessed[phonemes !== '∅' ? phonemes : '-']] 
              : ''
              return (
                <Fragment key={j}>
                  <dt className={classes}>
                    {prefix}{phonemes}
                  </dt>
                  <dd className={classes}>
                    {example}
                  </dd>
                </Fragment>
              )
            })}
            </div>
          )
        )}
        </dl>
        </Fragment>
      )}
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