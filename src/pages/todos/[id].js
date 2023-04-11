import styles from '@/styles/Home.module.css'
import NavBar from '@/components/nav';
import Item from '@/components/todoItem';
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react';
import { SignIn, SignedIn, SignedOut } from '@clerk/nextjs';

function Id(){
    const router = useRouter();
    const { id } = router.query;
    const [data , setData] = useState(null);

    useEffect(()=>{
        // Fetch data 
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+`/item/${id}`, {
            method:"GET",
            headers: {
                'x-apikey': process.env.NEXT_PUBLIC_API_KEY,
                'Content-Type': 'application/json', 
            }
        }).then(response => response.json())
        .then(json =>{
            setData(json);
        })
        .catch((error) => {
            console.log("Error while retrieving page")
            router.replace("/404")
        });
    },[]);

    return <>
        <SignedIn>
            <NavBar signedIn={true}></NavBar>
            <h1 className={styles.mainTitle}>Item Overview</h1>
            <div className={styles.mainContainer}>
                <div>
                    {data && <Item id={id} json={data} router={router}></Item>}
                </div>
            </div>
        </SignedIn>
        <SignedOut>
            <div className={styles.signInContainer}>
                <div className={styles.signInChild}>
                    <SignIn redirectUrl={`/todos/${id}`}/>
                </div>
            </div>   
        </SignedOut>
    </>
}

export default Id;