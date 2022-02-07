import { Fragment, useRef, useState } from 'react'
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore'
import { Dialog } from '@components/common'
import { External, GitHub } from '@components/icons'
import styles from '@styles/dialog/InfoDialog.module.sass'

const majorLinks = [{
  label: '遊戲原程式碼',
  name: 'LukHap 六合',
  github: 'https://github.com/jonathan-lph/lukhap'
}, {
  label: '漢語多功能字庫',
  name: '粵語音節表',
  external: 'https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/syllables.php'
}]

const minorLinks = [{
  label: '原遊戲',
  name: 'Wordle',
  link: 'https://www.powerlanguage.co.uk/wordle/',
}, {
  label: '啟發遊戲',
  name: 'ZiDou',
  link: 'https://chaaklau.github.io/zidou/',
}, {
  label: '粵拼及詞源',
  name: 'Rime 粵拼方案',
  link: 'https://github.com/rime/rime-cantonese',
}, {
  label: '私隱政策',
  name: 'Google Docs',
  link: 'https://docs.google.com/document/d/1uxALGuP0aYQrw_S5tS5zCEju0p3-rN82SYZX9T8l664/edit?usp=sharing'
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

const PhonemesTable = ({ type, list, guessed }) => {
  return (
    <div className={styles.section}>
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
    </div>
  )
}

const MajorLinks = () => {
  return (
    <div className={styles.majorLinks}>
      {majorLinks.map(({label, name, external, github}) => 
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
  )
}

const MinorLinks = () => {
  return (
    <div className={styles.minorLinks}>
      {minorLinks.map(({label, link}) =>
        <Fragment key={label}>
          <a href={link} target="_blank" rel="noreferrer">
            {label}
          </a>
          ．
        </Fragment>
      )}
      <a href="mailto:jonathan.lph+lukhap@hotmail.com">
        聯絡
      </a>
    </div>
  )
}

const ReportForm = () => {

  const [input, setInput] = useState('')
  const submitButton = useRef()

  const handleInput = e => {
    setInput(e.target.value)
    if (
      submitButton.current?.classList.contains(styles.error) ||
      submitButton.current?.classList.contains(styles.submitted)
    ) {
      submitButton.current.classList.remove(styles.error)
      submitButton.current.classList.remove(styles.submitted)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (submitButton.current) 
      submitButton.current.value = '　……　'
    let message = '已回報！'
    try {
      const db = getFirestore()
      const doc = await addDoc(collection(db, 'missing_words'), {
        word: input,
        submit_time: Timestamp.now()
      })
      if (doc.id)
        submitButton.current?.classList.add(styles.submitted)
    } catch (e) {
      submitButton.current?.classList.add(styles.error)
      message = '回報出錯'
    }
    setTimeout(() => { 
      if (submitButton.current)
        submitButton.current.value = message
    }, 125)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input 
        required
        type="text" name="word"
        className={styles.input}
        value={input}
        onChange={handleInput}
        placeholder="漏詞／音（請輸入整個詞語）"
      />
      <input 
        type="submit" 
        value="　回報　"
        className={styles.submit}
        disabled={!input}
        ref={submitButton}
      />
    </form>
  )
}

export default function InfoDialog({ guessed, ...props }) {

  return (
    <Dialog
      className={styles.root} 
      {...props}
      title="資料"
      noPadding
    >
      {tables.map((info) => 
        <PhonemesTable {...info} key={info.type} guessed={guessed} />
      )}
      <hr className={styles.divider}/>
      <div className={styles.links}>
        <ReportForm/>
        <MajorLinks/>
        <MinorLinks/>
      </div>
    </Dialog>
  )
}