import { SignIn } from "@clerk/nextjs";
import styles from '@/styles/SignIn.module.css';

export default function Login(){
    return <>
    <div className={styles.signInContainer}>
        <div className={styles.signInChild}>
            <SignIn path="/login" routing="path" redirectUrl="/todos"/>
        </div>
    </div> 
    </>
}