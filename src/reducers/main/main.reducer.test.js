import mainReducer from './mainReducer';
import {mainActions} from "./main.actions";

/**
 *
 * Юнит тест для редьюсера:
 * проверка как изменится state при кейсе - удаления задачи
 *
 */



it('task should be deleted',()=>{
    let action = mainActions.deleteTask(2)
    let state = {
     tasks: [
         { id: 1, text: 'hi!'},
         { id: 2, text: 'cool!'},
         { id: 3, text: 'nice!'},
    ]}

    let newState = mainReducer(state,action)

    expect(newState.tasks.length).toBe(2)
})