import styles from '@/styles/Home.module.css'
import ListItem from "@/components/listitem";
import NavBar from "@/components/nav";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SignedIn,SignedOut,SignIn } from '@clerk/clerk-react';

 
function Done(){
    const router = useRouter();
    const [data , setData] = useState(null);
    useEffect(()=>{
        console.log("Fetching Done data")
        // Fetch data 
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+`/item`, {
            method:"GET",
            headers: {
                'x-apikey': process.env.NEXT_PUBLIC_API_KEY,
                'Content-Type': 'application/json', 
            }
        }).then(response => response.json())
        .then(json =>{
            setData(json);
        });
    },[]);

    function clickMarkDone(e){
        if(confirm("Are you sure you want to mark the item as To-Do?")=== true){
            const target_id = e.target.id.split("-")[1];  // we should get ["checkbox", "<ID>"]'s first element
            fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+`/item/${target_id}`, {
                method:"PATCH",
                headers: {
                    'x-apikey': process.env.NEXT_PUBLIC_API_KEY,
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    done:false
                })
            }).then(response => response.json())
            .then(json =>{
                setData(data.filter((item) => item._id !== target_id))
            });
        }
        else{
            e.target.checked = true;
        }
    }
                    
    return (
        <>
        <SignedIn>
            <NavBar signedIn={true}></NavBar>
            <h1 className={styles.mainTitle}>Done: Completed Items</h1>
            <div className={styles.mainContainer}>
                { data && data.map( (item) => {
                    if(item.done){
                        return <div className={styles.listItem} key={`key-${item._id}`} id={`container-${item._id}`}>
                        <input type="checkbox" id={`checkbox-${item._id}`} onChange={clickMarkDone} checked></input>
                        <ListItem id={`item-${item._id}`} key={`key-${item._id}`} name={item.name}  content={item.content}
                        link={`/done`} router={router}></ListItem>  
                    </div>
                    }
                })}
            </div>
        </SignedIn>
        <SignedOut>
            <SignIn path="/login" routing="path" redirectUrl="/done"/>;
        </SignedOut>
        </>
    )
}

export default Done;