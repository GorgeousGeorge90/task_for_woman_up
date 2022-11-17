import {NavLink} from 'react-router-dom';
import styles from './Header.module.scss';


const Header = ()=> {
    const setActive = ({isActive}) => ({color: isActive? 'red': 'white'})
    return (
        <header className={styles.content}>
            <div>
                <h1>ToDo List</h1>
                <p>test task for WomanUP</p>
            </div>
            <nav>
                <ul>
                    <li><NavLink style={setActive} to={'Main'}>Main</NavLink></li>
                    <li><NavLink style={setActive} to={'Contacts'}>Contacts</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default  Header