import { Dialog } from "@components/common";
import { useEffect, useState } from "react";
import styles from '@styles/dialog/StatisticsDialog.module.sass'
import { Fragment } from "react";

export default function StatisticsDialog(props) {
  const [stat, setStat] = useState(null)

  useEffect(() => {
    const local = localStorage.getItem('statistics')
    if (local) setStat(JSON.parse(local))
  }, [])

  const data = [{
    label: '已遊玩',
    value: stat?.gamesPlayed ?? 0
  }, {
    label: '勝率',
    value: stat?.winPercentage ?? 0
  }, {
    label: '連勝',
    value: stat?.currentStreak ?? 0
  }, {
    label: '最高連勝',
    value: stat?.maxStreak ?? 0
  }]

  const maxDistribution = stat?.guesses 
    ? Math.max(...Object.values({...stat.guesses, fail: 0}))
    : null

  return (
    <Dialog
      {...props}
      title="遊戲統計"
    >
      <dl className={styles.stats}>
        {data.map(({label, value}) =>
          <div key={label} className={styles.stat}>
            <dd>{value}</dd>
            <dt>{label}</dt>
          </div>
        )}
      </dl>
      {stat?.guesses &&
        <dl className={styles.distribution}>
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
      }
    </Dialog>
  )
}