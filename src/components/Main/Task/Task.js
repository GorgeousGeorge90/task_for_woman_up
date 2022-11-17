import styles from './Task.module.scss';

const Task = ({task, deleteTask, completeTask})=> {
    return (
        <div className={styles.content}>
            <h3 onClick={()=>completeTask(task.id)}>Title:{task.title}</h3>
            <p>Description:{task.description}</p>
            <p>Final date:{task.date}</p>
            <p style={{float:"right"}} onClick={()=>deleteTask()}>x</p>
        </div>
    )
}

export default Task