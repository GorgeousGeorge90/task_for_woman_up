import {mainTypes} from './main.types';

/**
 *
 * Редьюсер - чистая функция принимающая на вход state и action и возвращающая
 * обновленный стейт ( реализованно через клоннирование state ( поверхностная + глубокая копия)
 * т.е реализованна иммутабельность.
 *
 * @param state {Object} объект с полями tasks{array} - массив задач и isFetching{Boolean} - флаг для активации компонента Preloader
 * @param action {object} объект с полями тип (type) и полезная нагрузка (payload) - для описания различных кейсов со state
 * @return {(*&{tasks: unknown[]})|(*&{tasks: *[]})|(*&{isFetching})|(*&{file: null})|*|(*&{tasks})|(*&{tasks: T[]})|(*&{file})}
 */


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

        default: {
            return state
        }
    }
}

export default mainReducer
