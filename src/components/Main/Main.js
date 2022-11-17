import {useForm} from 'react-hook-form'
import {useContext} from 'react';
import {MainContext} from '../../context/MainContext';
import Task from './Task/Task';

const Main = () => {
    const {tasks, addTask, deleteTask, completeTask} = useContext(MainContext)
    const {handleSubmit,register, reset, formState:{errors}} = useForm()
    const onSubmit = data =>{
        const {title, description, date} = data
        addTask(title, description, date)
        reset()
    }
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('title')} placeholder={'Title'}/>
                    <input {...register('description')} placeholder={'Description'}/>
                    <input {...register('date')} placeholder={'Final date'}/>
                    <button type={'submit'}>Create</button>
                </form>
            </div>
            <div>
                {
                    tasks.map(task => <Task key={task.id}
                                            task={task}
                                            deleteTask={deleteTask}
                                            completeTask={completeTask}
                    />)
                }
            </div>
        </div>
    )
}

export default Main