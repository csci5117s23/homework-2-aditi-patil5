import { SignIn } from "@clerk/nextjs";
import styles from '@/styles/SignIn.module.css';

export default function Login(){
    return <>
       <SignIn path="/login" routing="path" redirectUrl="/todos"/>;
    </>
}