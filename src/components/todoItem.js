import { useState } from "react";
import styles from '@/styles/Home.module.css'
import MarkDoneButton from "./markDoneButton";

export default function Item(props){
    const [isEdit, setEdit] = useState(false);
    const [content, setContent] = useState(props.json.content);
    const id = props.id;

    function toggleEdit(){
       if(isEdit){ // Check if user has clicked save in edit mode 
            console.log("Making a PATCH request for content")
            fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+`/item/${id}`, {
                method:"PATCH",
                headers: {
                    'x-apikey': process.env.NEXT_PUBLIC_API_KEY,
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    content: content
                })
            }).then(response => response.json())
            .then(json =>{
                setEdit(false);         // set edit to false
            });
            
       }
       else {
            setEdit(true);
       }
    }

    return <>
        {!isEdit && <>
            <h3 className={styles.inline}>Description: <span className={styles.info}>(Click text below to edit)</span></h3>
            <MarkDoneButton id={`button-${id}`} done={props.json.done}></MarkDoneButton>
            <p id="descriptionCurrent" onClick={toggleEdit} className={styles.textProps}>{content}</p>
        </>}
        {isEdit && 
        <>
            {/* Refer the following to get an editable input: https://dev.to/joshuajee/how-to-fix-defaultvalue-error-while-working-with-textarea-in-react-1a55 */}
            <h3 className={styles.inline}>Description:</h3>
            <MarkDoneButton id={`button-${id}`} done={props.json.done}></MarkDoneButton>
            <textarea id="descriptionEdit" value={content} onChange={(e) => setContent(e.target.value)} required className={`${styles.block}`}></textarea>
            <button onClick={toggleEdit} className={`pure-button pure-button-primary ${styles.block}`}>Save</button>
        </>}
    </>
}