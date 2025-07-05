import React from 'react'
import Logo from './components/Logo/Logo'
import Actions from './components/Actions/Actions'

import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.layout}>
      <Logo />
      <Actions />
      </div>
    </header>
  )
}

export default Header