import NavBar from '@/components/nav'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

export default function Custom404() {
    return <>
        <NavBar ></NavBar>
        <h1 className={styles.mainTitle}>404 - Page Not Found</h1>
        <div className={styles.mainContainer}>
            <Link href={"/todos"}>	&larr; Go Back to Todos</Link>
        </div>
        
    </>
  }