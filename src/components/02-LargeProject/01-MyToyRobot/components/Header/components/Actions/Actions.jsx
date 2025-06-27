import React from 'react'
import styles from './Actions.module.css'

const Actions = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex gap-2">
      <button className={styles.button} onClick={handleRefresh}>
        🔄 Reset Game
      </button>
      <button className={styles.button} onClick={() => window.open('https://github.com/Allen5288/React-Apps-Collection', '_blank')}>
        📖 GitHub
      </button>
    </div>
  )
}

export default Actions