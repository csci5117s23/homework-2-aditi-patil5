import NavBar from '@/components/nav'
import styles from '@/styles/Home.module.css'
import { SignedIn, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
    const { getToken, isLoaded, isSignedIn } = useAuth();
    const [signedInState, setSignedInState] = useState(false);
    const router = useRouter();
    function handleSignIn(){
        router.push("/login")
    }

    useEffect(()=>{
        console.log("settingState")
        setSignedInState(isSignedIn);
    }, [isLoaded]);
    
    return (
        <>
            {signedInState && <NavBar signedIn={true}></NavBar>}
            {!signedInState && <NavBar signedIn={false}></NavBar>}
            <h1 className={styles.mainTitle}>Home Page</h1>
            <div className={styles.mainContainer}>
                <div className="pure-g">
                    <div className="pure-u-3-4">
                        <p>Welcome to your personal todo list app!</p>
                        <br></br>
                        <p>Login to start creating and viewing your todo list</p>    
                    </div>
                    <div className="pure-u-1-8">
                        <button onClick={handleSignIn} className={`pure-button pure-button-primary`}>Login</button>
                    </div>
                    
                </div>
            </div>
        </>
  )
}
