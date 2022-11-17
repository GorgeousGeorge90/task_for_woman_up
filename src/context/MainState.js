import {MainContext} from './MainContext';
import mainReducer from '../reducers/main/mainReducer';
import {mainActions} from '../reducers/main/main.actions';
import {useReducer} from 'react';

const MainState = ({children})=> {
    const initialState = {
        tasks:[],
        isFetching:false,
    }
    const [state, dispatch] = useReducer(mainReducer, initialState)
    const addTask = (title, description, date)=>{
        dispatch(mainActions.addTask(title,description,date))
    }
    const deleteTask = id => {
        dispatch(mainActions.deleteTask(id))
    }
    const completeTask = id => {
        dispatch(mainActions.completeTask(id))
    }
    window.state = state
    return (
        <MainContext.Provider value={{
            tasks: state.tasks,
            isFetching: state.isFetching,
            addTask,
            deleteTask,
            completeTask,
        }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainState