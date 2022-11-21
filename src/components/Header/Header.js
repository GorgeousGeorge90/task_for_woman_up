import {NavLink} from 'react-router-dom';
import styles from './Header.module.scss';


/**
 *
 * Компонент, возвращающий разметку для Header
 * Присуствует навигация по страницам, реазлизованная через
 * нативные линки NavLink библиотеки 'react-router-dom',
 * которые в свою очередь являются оберткой над обычной ссылкой a.
 * Функция setActive предстваляет собой стрелочную функцию с тернарным
 * оператором внутри.
 *
 * @return {JSX.Element}
 * @constructor
 */


const Header = ()=> {
    const setActive = ({isActive}) => ({color: isActive? 'red': 'white'})
    return (
        <header className={styles.content}>
            <div className={styles.title}>
                <h1>Task catcher</h1>
                <p>the base app</p>
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