import {MainContext} from './MainContext';
import mainReducer from '../reducers/main/mainReducer';
import {mainActions} from '../reducers/main/main.actions';
import {useReducer} from 'react';
import axios from 'axios';


const MainState = ({children})=> {
    const baseURL = 'https://task-e2e98-default-rtdb.firebaseio.com'
    const initialState = {
        tasks:[],
        isFetching:false,
    }
    const [state, dispatch] = useReducer(mainReducer, initialState)

    const getLoading = payload => dispatch(mainActions.getIsFetching(payload))
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

    const changeTask = async (id,text)=> {
        getLoading(true)
        await axios.patch(`${baseURL}/tasks/${id}.json`, {
            description: text,
        })
        dispatch(mainActions.changeTask(id,text))
        getLoading(false)
    }

    const deleteTask = async id => {
        getLoading(true)
        await axios.delete(`${baseURL}/tasks/${id}.json`)
        dispatch(mainActions.deleteTask(id))
        getLoading(false)
    }

    const completeTask = async id => {
        getLoading(true)
        await axios.patch(`${baseURL}/tasks/${id}.json`, {
            complete: true,
        })
        dispatch(mainActions.completeTask(id))
        getLoading(false)
    }

    const addFile = async (file, id) => {
        const formData = new FormData()
        formData.append('newFile', file)
        const response = await axios.patch(`${baseURL}/tasks/${id}.json`,{
            file,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
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
            addFile,
        }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainState