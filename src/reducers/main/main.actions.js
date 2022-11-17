import {mainTypes} from './main.types';

export const mainActions = {
    getTasks: payload => ({type: mainTypes.GET_ALL_TASK, payload}),
    addTask: payload => ({type: mainTypes.ADD_TASK, payload}),
    completeTask:payload =>({type: mainTypes.COMPLETE_TASK, payload}),
    deleteTask:payload =>({type: mainTypes.COMPLETE_TASK, payload}),
}
