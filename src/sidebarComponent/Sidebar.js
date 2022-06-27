import React from 'react'
import styles from './Sidebar.module.css'

export default function Sidebar({children}) {
  return (
    <div className={styles.sidebar}>
      {children}
    </div>
  )
}
