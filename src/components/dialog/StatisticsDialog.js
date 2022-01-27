import { Dialog } from "@components/common";
import { useEffect, useState, useRef } from "react";
import styles from '@styles/dialog/StatisticsDialog.module.sass'
import { Fragment } from "react";
import { Trophy } from "@components/icons";

const data = [{
  label: '已遊玩',
  key: 'gamesPlayed' 
}, {
  label: '勝率 %',
  key: 'winPercentage'
}, {
  label: '連勝',
  key: 'currentStreak'
}, {
  label: '最高連勝',
  key: 'maxStreak'
}]

const padNum = num => Math.floor(num).toString().padStart(2, 0)

export default function StatisticsDialog({ evaluations, ending, ...props }) {
  const [stat, setStat] = useState(null)
  const diffSec = useRef()
  const countdown = useRef()
  const shareButton = useRef()

  const handleCopyResult = () => {
    const str = '詞道 '
    str += Math.floor((Date.now() - 1643126401000) / 1000 / 3600 / 24)
    if (ending === 'fail') str += ' -/6\n'
    else str += ` ${ending}/6\n`
    evaluations.forEach(arr => {
      if (arr === null) return
      arr.forEach((evaluation, idx) => {
        str += evaluation === 'absent' ? '⬛'
          : evaluation === 'present' ? '🟨'
          : evaluation === 'correct' ? '🟩' : ''
        if (idx === arr.length-1) str += '\n'
      })
    })
    navigator.clipboard.writeText(str)
    shareButton.current?.classList.add(styles.copied)
  }

  useEffect(() => {
    const local = localStorage.getItem('statistics')
    if (local) setStat(JSON.parse(local))
  }, [props.open])

  // Set countdown timer
  useEffect(() => {
    const today = new Date()
    const tmr = new Date()
    tmr.setDate(tmr.getDate() + 1)
    tmr.setHours(0, 0, 0, 0)
    diffSec.current = Math.floor(tmr.valueOf() - today.valueOf()) / 1000
    const timer = setInterval(() => {
      if (!countdown.current) return;
      countdown.current.innerText = 
        `${padNum(diffSec.current / 3600)}:${padNum(diffSec.current / 60 % 60)}:${padNum(diffSec.current % 60)}`
      diffSec.current--
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const maxDistribution = stat?.guesses 
    ? Math.max(...Object.values({...stat.guesses, fail: 0}))
    : null

  return (
    <Dialog
      {...props}
      title="遊戲統計"
    >
      <dl className={styles.stats}>
        {data.map(({label, key}) =>
          <div key={label} className={styles.stat}>
            <dd>{stat?.[key] ?? 0}</dd>
            <dt>{label}</dt>
          </div>
        )}
      </dl>
      {stat?.guesses 
      ? <dl className={styles.distribution}>
          {[...Array(6)].map((_, i) => {
            const numPercentage = Math.floor(stat.guesses[i+1]/maxDistribution * 100).toFixed(2)
            return (
            <Fragment key={`dist-${i}`}>
              <dt>{i+1}</dt>
              <div className={styles.barOuter}>
                <div 
                  className={styles.bar}
                  style={{width: `${numPercentage}%`}}
                />
                <div 
                  className={styles.barHidden}
                  style={{width: `${numPercentage}%`}}
                />
                <dd>{stat.guesses[i+1]}</dd>
              </div>
            </Fragment>
          )})}
        </dl>
      : <div className={styles.emptyDistribution}>
          未有其他數據
        </div>
      }
      {ending &&
        <div className={styles.footer}>
          <dl className={styles.countdown}>
            <time ref={countdown}>00:00:00</time>
            <div>距離下個詞語</div>
          </dl>
          <div className={styles.shareDiv}>
            <button 
              className={styles.share} 
              onClick={handleCopyResult} 
              ref={shareButton}
            >
              <Trophy/>
            </button>
          </div>
        </div>
      }
    </Dialog>
  )
}