import styles from '@/styles/Home.module.css'
import AddItemForm from "@/components/addItemForm";
import ListItem from "@/components/listitem";
import NavBar from "@/components/nav";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SignIn, SignedIn, SignedOut, useAuth } from '@clerk/nextjs';
import jwtDecode from 'jwt-decode';

 
function Todos(){
    const router = useRouter();
    const [isFormDisplayed, setFormDisplayed] = useState(false);
    const [data , setData] = useState(null);
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    useEffect(()=>{
        console.log("Fetching Todo data")
        if(userId){
            fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+`/item?userId=${userId}`, {
                method:"GET",
                headers: {
                    'x-apikey': process.env.NEXT_PUBLIC_API_KEY,
                    'Content-Type': 'application/json', 
                }
            }).then(response => response.json()
            ).then(json =>{
                setData(json);
            }).catch((error) => {
                console.log("Error while retrieving page")
                router.replace("/404")
            });
        }
    },[isLoaded]);

    function toggleForm(){
        (isFormDisplayed) ? setFormDisplayed(false) : setFormDisplayed(true);
    }

    function clickMarkDone(e){
        if(confirm("Are you sure you want to mark the item as done?")=== true){
            const target_id = e.target.id.split("-")[1];  // we should get ["checkbox", "<ID>"]'s first element
            fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+`/item/${target_id}`, {
                method:"PATCH",
                headers: {
                    'x-apikey': process.env.NEXT_PUBLIC_API_KEY,
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    done:true
                })
            }).then(response => response.json())
            .then(json =>{
                setData(data.filter((item) => item._id !== target_id))
            });
            
        }
        else{
            e.target.checked = false;
        }
    }
    
    function onClickNavigateToItem(e){
        let id = e.target.id.split("-")[1]
        router.push(`/todos/${id}`);
    }

    function onSubmitAddForm(e){
        e.preventDefault();
        
        const content = e.target.content.value;
        if(userId){
            fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+`/item`, {
                method:"POST",
                headers: {
                    'x-apikey': process.env.NEXT_PUBLIC_API_KEY,
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    content: content,
                    userId: userId
                })
            }).then(response => response.json())
            .then(json =>{
                // add element to data
                setData(prevArray => [json, ...prevArray])
                setFormDisplayed(value => !value);
            }); 
        }
    }

    return (
        <>
        <SignedIn>
            <NavBar signedIn={true}></NavBar>
            <h1 className={styles.mainTitle}>Todo Page</h1>
            <div className={styles.mainContainer}>
                <button onClick={toggleForm} className='pure-button pure-button-primary'>Add +</button>
                { isFormDisplayed && <AddItemForm onSubmit={onSubmitAddForm}></AddItemForm>}
                <div>
                    { data && data.map( (item) => {
                        if(!item.done){
                            return <div className={styles.listItem} key={`key-${item._id}`} id={`container-${item._id}`}>
                                <input type="checkbox" id={`checkbox-${item._id}`} onChange={clickMarkDone}></input>
                                <ListItem name={item.name} id={`listItem-${item._id}`} content={item.content}
                                router={router} onClick={onClickNavigateToItem}></ListItem>
                            </div>
                        }
                    })}
                </div>
            </div>
        </SignedIn>
        <SignedOut>
            <div className={styles.signInContainer}>
                <div className={styles.signInChild}>
                    <SignIn redirectUrl="/todos"/>
                </div>
            </div>
        </SignedOut>
        </>
      )
}

export default Todos;