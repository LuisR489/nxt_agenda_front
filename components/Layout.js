import styles from '../styles/components/Layout.module.scss'
import Link from "next/link"

export default function Layout({children}) {
  return (
    <div className={styles.layout}  >
      <div className={styles.layout__header} >
        <nav className={styles.layout__nav}>
          <p className={styles.layout__title}>Information  Soft</p>
          <Link href='/dashboard' >
            <a className={styles.layout__link}>Inicio</a>
          </Link>
        </nav>
      </div>
      <div className={styles.layout__container} >
        {children}
      </div>
    </div>
  )
}
