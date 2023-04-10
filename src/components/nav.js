import Link from "next/link";
import styles from '@/styles/Home.module.css'

export default function NavBar(){
    return <>  
        <div className={styles.navContainer}>
            <Link className={styles.navItem} href={"/"}> Home</Link>
            <Link className={styles.navItem} href={"/todos"}>Todos</Link>
            <Link className={styles.navItem} href={"/done"}> Done</Link>
        </div>
    </>
}