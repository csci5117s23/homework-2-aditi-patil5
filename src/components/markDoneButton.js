import styles from '@/styles/Home.module.css'
import { useState } from 'react';
export default function MarkDoneButton(props){
    const [done, setDone] = useState(props.done);
    const id = props.id.split("-")[1];
    function markDoneClick(){
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+`/item/${id}`, {
            method:"PATCH",
            headers: {
                'x-apikey': process.env.NEXT_PUBLIC_API_KEY,
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                done:!done
            })
        }).then(response => response.json())
        .then(json =>{
            setDone(value => !value);
        });
    }
    return <>
        { !done && <button onClick={markDoneClick} className={`${styles.doneButton} ${styles.inline}`}>Mark Done &#10003; </button>}
        { done && <button onClick={markDoneClick} className={`${styles.doneButton} ${styles.inline}`}>Mark Todo &#8617; </button>}
    </>
}