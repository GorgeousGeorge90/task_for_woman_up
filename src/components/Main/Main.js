import {useContext, useEffect, useMemo} from 'react';
import {MainContext} from '../../context/MainContext';
import Task from './Task/Task';
import Preloader from '../../common/Preloader/Preloader';
import styles from './Main.module.scss';
import Form from './Form/Form';


const Main = () => {
    const {tasks, isFetching, addTask, fetchTasks,
            changeTask, deleteTask, completeTask,
            addFile} = useContext(MainContext)
    useEffect(()=>{
        fetchTasks()
    },[])

    const completedTasks = useMemo(()=> {
        return tasks.filter(task => task.complete === true)
    },[tasks])

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
                                            addFile={addFile}
                    />)
                }
            </div>
        </div>
    )
}

export default Main