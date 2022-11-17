import {mainTypes} from './main.types';

export const mainActions = {
    getTasks: payload => ({type: mainTypes.GET_ALL_TASK, payload}),
    addTask: (title, description, date) => ({type: mainTypes.ADD_TASK, payload:{title,description,date}}),
    completeTask:payload =>({type: mainTypes.COMPLETE_TASK, payload}),
    deleteTask:payload =>({type: mainTypes.COMPLETE_TASK, payload}),
}
