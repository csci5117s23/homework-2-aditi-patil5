import NavBar from '@/components/nav'
import styles from '@/styles/Home.module.css'

export default function Home() {

    return (
        <>
        <NavBar></NavBar>
        <h1 className={styles.mainTitle}>Home Page</h1>
        <div className={styles.mainContainer}>
            <div className="pure-g">
                <div className="pure-u-3-4">
                    <p>Welcome to your personal todo list app!</p>
                    <br></br>
                    <p>Login to start creating and viewing your todo list</p>    
                </div>
                <div className="pure-u-1-8">
                    <button className='pure-button pure-button-primary'>Login</button>
                </div>
                
            </div>
        </div>
        </>
  )
}
