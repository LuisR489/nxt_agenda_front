import React from 'react'
import styles from '../styles/components/Layout.module.scss'

export default function Layout({children}) {
  return (
    <div className={styles.layout}  >
      <nav className={styles.layout__nav} >
        <p className={styles.layout__title}>Software</p>
      </nav>
      {children}
    </div>
  )
}
