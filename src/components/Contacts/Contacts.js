import styles from './Contacts.module.scss'

const Contacts = ()=> {
    return (
        <div className={styles.content}>
            <h1>Feedback</h1>
            <p>Thank you for using this app!</p>
            <p>We need your advise, how to improve this!</p>
            <p><b>Email for feedback:</b> Gambit47@yandex.ru</p>
        </div>
    )
}

export default Contacts