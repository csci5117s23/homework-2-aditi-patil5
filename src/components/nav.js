import Link from "next/link";
import styles from '@/styles/Home.module.css'
import { UserButton } from "@clerk/nextjs";
import { useRef } from "react";

export default function NavBar(props){
    const signedIn = useRef(props.signedIn);
    return <>  
        <div className={styles.navContainer}>
            <Link className={styles.navItem} href={"/"}> Home</Link>
            <Link className={styles.navItem} href={"/todos"}>Todos</Link>
            <Link className={styles.navItem} href={"/done"}> Done</Link>
            { signedIn.current && <UserButton></UserButton>}
        </div>
    </>
}