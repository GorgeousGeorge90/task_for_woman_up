import {mainTypes} from './main.types';

/**
 *
 * Объект, содержащий в виде методов нобор функций,
 * возвращающий объект action (actionCreaters)
 *
 * @type {{completeTask: (function(*): {payload: *, type: string}), getIsFetching: (function(*): {payload: *, type: string}), getTasks: (function(*): {payload: *, type: string}), changeTask: (function(*, *): {payload: {id: *, text: *}, type: string}), deleteTask: (function(*): {payload: *, type: string}), addTask: (function(*): {payload: *, type: string})}}
 */


export const mainActions = {
    getTasks: payload => ({type: mainTypes.GET_ALL_TASK, payload}),
    addTask: payload => ({type: mainTypes.ADD_TASK, payload}),
    changeTask: (id,text) => ({type: mainTypes.CHANGE_TASK, payload:{id, text}}),
    completeTask:payload =>({type: mainTypes.COMPLETE_TASK, payload}),
    deleteTask:id=>({type: mainTypes.DELETE_TASK, payload:id}),
    getIsFetching:payload =>({type: mainTypes.IS_FETCHING, payload})
}
