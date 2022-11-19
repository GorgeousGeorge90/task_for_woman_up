import {mainTypes} from './main.types';

export const mainActions = {
    getTasks: payload => ({type: mainTypes.GET_ALL_TASK, payload}),
    addTask: payload => ({type: mainTypes.ADD_TASK, payload}),
    changeTask: (id,text) => ({type: mainTypes.CHANGE_TASK, payload:{id, text}}),
    completeTask:payload =>({type: mainTypes.COMPLETE_TASK, payload}),
    deleteTask:id=>({type: mainTypes.DELETE_TASK, payload:id}),
    getIsFetching:payload =>({type: mainTypes.IS_FETCHING, payload})
}
