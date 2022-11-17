import {mainTypes} from './main.types';


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
                id:state.tasks.length,
                title: action.payload.title,
                description: action.payload.description,
                date: action.payload.date,
                complete: false,
                files: null,
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

        default: {
            return state
        }
    }
}

export default mainReducer()