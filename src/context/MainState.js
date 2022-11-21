import {MainContext} from './MainContext';
import mainReducer from '../reducers/main/mainReducer';
import {mainActions} from '../reducers/main/main.actions';
import {useReducer} from 'react';
import axios from 'axios';


/**
 *
 * Данный компонент явлется оберткой для дочерних элементов,
 * через который мы можем передавать конеткст
 *
 * @param children
 * @return {JSX.Element}
 * @constructor
 */


const MainState = ({children})=> {
    const baseURL = 'https://task-e2e98-default-rtdb.firebaseio.com'
    const initialState = {
        tasks:[],
        isFetching:false,
    }
    const [state, dispatch] = useReducer(mainReducer, initialState)


    /**
     *
     * Функция для изменения  статуса для Preloader
     *
     * @param payload {Boolean}
     */

    const getLoading = payload => dispatch(mainActions.getIsFetching(payload))

    /**
     *
     * Функция для запроса всех существующих задач с БД
     *
     * @return {Promise<void>}
     */

    const fetchTasks = async () => {
        getLoading(true)
        const response= await axios.get(`${baseURL}/tasks.json`)
        if (!response.data) {
            getLoading(false)
        } else {
            const payload = Object.keys(response.data).map(key => {
                return {
                    ...response.data[key],
                    id: key,
                }
            })
            dispatch(mainActions.getTasks(payload))
            getLoading(false)
        }
    }

    /**
     *
     * Функция для создания задачи
     *
     * @param title {string}
     * @param description {string}
     * @param date {date}
     * @return {Promise<void>}
     */


    const addTask = async (title, description, date)=> {
        const body = {
            title,
            description,
            date,
            complete: false,
        }
        getLoading(true)
        const response = await axios.post(`${baseURL}/tasks.json`, body)
        const payload = {
            ...body,
            id: response.data.name,
        }
        dispatch(mainActions.addTask(payload))
        getLoading(false)
    }

    /**
     *
     * Функция для обновления описания задачи
     *
     * @param id {string}
     * @param text {string}
     * @return {Promise<void>}
     */

    const changeTask = async (id,text)=> {
        getLoading(true)
        await axios.patch(`${baseURL}/tasks/${id}.json`, {
            description: text,
        })
        dispatch(mainActions.changeTask(id,text))
        getLoading(false)
    }

    /**
     *
     * Функция для удаления задачи
     *
     * @param id {string}
     * @return {Promise<void>}
     */

    const deleteTask = async id => {
        getLoading(true)
        await axios.delete(`${baseURL}/tasks/${id}.json`)
        dispatch(mainActions.deleteTask(id))
        getLoading(false)
    }

    /**
     *
     * Функция для пометки задачи как выполененой
     * активируется по клику по названию
     *
     * @param id {string}
     * @return {Promise<void>}
     */

    const completeTask = async id => {
        getLoading(true)
        await axios.patch(`${baseURL}/tasks/${id}.json`, {
            complete: true,
        })
        dispatch(mainActions.completeTask(id))
        getLoading(false)
    }


    window.state = state
    return (
        <MainContext.Provider value={{
            tasks: state.tasks,
            isFetching: state.isFetching,
            fetchTasks,
            addTask,
            changeTask,
            deleteTask,
            completeTask,
            getLoading,
        }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainState