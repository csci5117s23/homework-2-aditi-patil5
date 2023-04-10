import styles from '@/styles/Home.module.css'
export default function AddItemForm(props){
    
    return <>
        <br></br>
        <form className={`pure-form ${styles.addForm}`} onSubmit={props.onSubmit}>
            <fieldset>
                <label htmlFor="content">Description</label>
                <textarea id="content" name="content" required></textarea>
                <button type="submit" className={`pure-button pure-button-primary ${styles.block}`} id="submitTodo">Submit</button>
            </fieldset>
        </form>
    </>
}