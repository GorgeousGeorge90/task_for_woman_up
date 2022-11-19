import {mainTypes} from './main.types';
import task from "../../components/Main/Task/Task";


const mainReducer = (state,action) => {
    switch (action.type) {

        case mainTypes.GET_ALL_TASK: {
            return {
                ...state,
                tasks: action.payload,
            }
        }

        case mainTypes.ADD_TASK: {
            const newTask = {
                id:action.payload.id,
                title: action.payload.title,
                description: action.payload.description,
                date: action.payload.date,
                complete: false,
                file: null,
            }

            return {
                ...state,
                tasks: [...state.tasks, newTask]
            }
        }

        case mainTypes.COMPLETE_TASK: {
            return {
                ...state,
                tasks:state.tasks.map(task => {
                    if (task.id === action.payload) {
                        return {
                            ...task,
                            complete: true,
                        }
                    } else {
                        return task
                    }
                })
            }
        }

        case mainTypes.CHANGE_TASK: {
            return {
                ...state,
                tasks:state.tasks.map(task=> {
                    if (task.id === action.payload.id) {
                        return {
                            ...task,
                            description: action.payload.text,
                        }
                    } else {
                        return task
                    }
                })
            }
        }

        case mainTypes.DELETE_TASK: {
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
        }

        case mainTypes.IS_FETCHING: {
            return {
                ...state,
                isFetching: action.payload,
            }
        }

        case mainTypes.ADD_FILE: {
            return {
                ...state,
                file: action.payload,
            }
        }

        case mainTypes.DELETE_FILE: {
            return {
                ...state,
                file: null,
            }

        }

        default: {
            return state
        }
    }
}

export default mainReducer
