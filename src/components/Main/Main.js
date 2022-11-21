import {useContext, useEffect, useMemo} from 'react';
import {MainContext} from '../../context/MainContext';
import Task from './Task/Task';
import Preloader from '../../common/Preloader/Preloader';
import styles from './Main.module.scss';
import Form from './Form/Form';

/**
 *
 * Компонент отрисовки для главной страницы
 *
 * @return {JSX.Element}
 * @constructor
 */


const Main = () => {

    /**
     *
     * Через хук useContext получаем доступ к необходимым
     * переменным и функциям
     *
     */

    const {tasks, isFetching, addTask, fetchTasks,
            changeTask, deleteTask, completeTask,} = useContext(MainContext)

    /**
     *
     * Используем useEffect чтобы подтянуть
     * существующие задачи при инициализации приложения
     *
     */

    useEffect(()=>{
        fetchTasks()
    },[])

    /**
     *
     * Используем хук useMemo чтобы хранить
     * и обновлять кол-во выполеннных задач
     *
     */

    const completedTasks = useMemo(()=> {
        return tasks.filter(task => task.complete === true)
    },[tasks])

    /**
     * Условие:
     * если флаг true (происходит какой то ассинхронный запрос к БД)
     * то получем крутилку (Preloader)
     *
     */

    if (isFetching) {
        return <Preloader/>
    }

    return (
        <div className={styles.content}>
            <div>
                <h3>Completed tasks:{completedTasks.length}</h3>
            </div>
            <div className={styles.form}>
                <Form addTask={addTask}/>
            </div>
            <div>
                {
                    tasks.map(task => <Task key={task.id}
                                            task={task}
                                            deleteTask={deleteTask}
                                            completeTask={completeTask}
                                            changeTask={changeTask}
                    />)
                }
            </div>
        </div>
    )
}

export default Main