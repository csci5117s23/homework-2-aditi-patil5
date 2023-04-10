import styles from '@/styles/Home.module.css'
export default function ListItem(props){
    const name = props.name;
    const content = props.content;
    let onclick = undefined;
    if(!props.onClick){
        onclick = (e) => {e.preventDefault()};
    }
    else{
        onclick = props.onClick;
    }

    return <>
        <div className={styles.width100} onClick={onclick}>
            <p id={props.id} className={styles.textProps}>{content}</p>
        </div>
    </>
}