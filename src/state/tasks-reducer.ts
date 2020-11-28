import {TaskStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";
import {create} from "domain";

type RemoveTasksActionType = {
    type: 'REMOVE-TASK'
    todolistID: string
    taskID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistID: string
    title: string
}


export type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string,
    todolistID: string,
    isDone: boolean
}

export type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string,
    todolistID: string,
    newTitle: string
}
type ActionType = ChangeTaskTitleType | RemoveTasksActionType | AddTaskActionType
    | ChangeTaskStatusType | AddTodolistActionType | RemoveTodolistActionType

let initialState:TaskStateType= {
    ['todoListId1']: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
    ],
    ['todoListId2']: [
        {id: v1(), title: "SaSS", isDone: true},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]
}

export const tasksReducer = (state=initialState, action: ActionType) => {
    switch (action.type) {
        case'REMOVE-TASK': {
            let copyState = {...state};
            let todoListTasks = copyState[action.todolistID];
            copyState[action.todolistID] = todoListTasks.filter(f => f.id !== action.taskID);
            return copyState;
        }
        case'ADD-TASK': {
            let copyState = {...state};
            let newTask = {id: v1(), title: action.title, isDone: false};
            let todoListTasks = copyState[action.todolistID];
            copyState[action.todolistID] = [newTask, ...todoListTasks]
            return copyState;
        }
        case 'CHANGE-TASK-TITLE': {

            let copyState = {...state};
            let todoListTasks = copyState[action.todolistID];
            copyState[action.todolistID] = todoListTasks.map(f => {
               if (f.id === action.taskID) {
                   return{...f,title:action.newTitle}
               }else{
                   return f
               }
            });
            return copyState
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks=state[action.todolistID]
            return ({...state,[action.todolistID]:todolistTasks.map(t=>t.id===action.taskID?{...t,isDone:action.isDone}:t)});
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistID]: []}
        }
        case'REMOVE-TODOLIST':
            let copyState = {...state};
            delete copyState[action.id];

            return copyState;
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTasksActionType => {
    return {taskID: taskID, todolistID: todolistID, type: 'REMOVE-TASK'}
}

export const addTaskAC = (newTodolistTitle: string, todolistID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistID: todolistID, title: newTodolistTitle}
}


export const changeTaskStatusAC = (taskID: string, todolistID: string, isDone: boolean): ChangeTaskStatusType => {
    return {type: 'CHANGE-TASK-STATUS', taskID: taskID, todolistID: todolistID, isDone: isDone}
}
// export const changeTaskStatusAC = (taskID: string, todolistID: string, isDone: boolean): ChangeTaskStatusType => {
//     return {type: 'CHANGE-TASK-STATUS', taskID: '2', todolistID: todolistID, isDone: isDone}
// }

export const changeTaskTitleAC = (taskID: string, todolistID: string, newTitle: string): ChangeTaskTitleType => {
    return {type: 'CHANGE-TASK-TITLE', taskID: taskID, todolistID: todolistID, newTitle: newTitle}
}


//===========================================
// import {TaskStateType} from "../App";
// import {v1} from "uuid";
//
// type RemoveTasksActionType = {
//     type: 'REMOVE-TASK'
//     todolistID: string
//     taskID: string
// }
// export type AddTaskActionType = {
//     type: 'ADD-TODOLIST'
//     todolistID: string
//     title: string
// }
//
// export type AddTasksActionType = {
//     type: 'ADD-TASKS'
// }
//
// export type ChangeTaskStatusType = {
//     type: 'CHANGE-TASK-STATUS'
//     taskID: string,
//     todolistID: string,
//     isDone: boolean
// }
//
// export type ChangeTaskTitleType = {
//     type: 'CHANGE-TASK-TITLE'
//     taskID: string,
//     todolistID: string,
//     newTitle: string
// }
// type ActionType = ChangeTaskTitleType | RemoveTasksActionType | AddTaskActionType
//     | ChangeTaskStatusType | AddTasksActionType
//
//
// export const tasksReducer = (state: TaskStateType, action: ActionType) => {
//     switch (action.type) {
//         case'REMOVE-TASK': {
//             let copyState = {...state};
//             let todoListTasks = copyState[action.todolistID];
//             copyState[action.todolistID] = todoListTasks.filter(f => f.id !== action.taskID);
//             return copyState;
//         }
//         case'ADD-TODOLIST': {
//             let copyState = {...state};
//             let newTask = {id: v1(), title: action.title, isDone: false};
//             let todoListTasks = copyState[action.todolistID];
//             copyState[action.todolistID] = [newTask, ...todoListTasks]
//             return copyState;
//         }
//         case 'CHANGE-TASK-TITLE': {
//             let copyState = {...state};
//             let todoListTasks = copyState[action.todolistID];
//             let task = todoListTasks.find(f => f.id === action.taskID);
//             if (task) {
//                 task.title = action.newTitle;
//                 return copyState;
//             }else{
//                 return state
//             }
//         }
//         case 'CHANGE-TASK-STATUS': {
//             let copyState = {...state};
//             let todoListTasks = copyState[action.todolistID];
//             let task = todoListTasks.find(f => f.id === action.taskID);
//             if (task) {
//                 task.isDone = action.isDone;
//                 return copyState;
//             }else{
//                 return state
//             }
//         }
//         case 'ADD-TASKS': {
//             return {...state,[v1()]:[]}
//         }
//
//
//         default:
//             throw new Error('I dont know this comand');
//     }
// }
//
// export const removeTaskAC = (taskID: string, todolistID: string): RemoveTasksActionType => {
//     return {taskID: taskID, todolistID: todolistID, type: 'REMOVE-TASK'}
// }
//
// export const addTaskAC = (newTodolistTitle: string, todolistID: string): AddTaskActionType => {
//     return {type: 'ADD-TODOLIST', todolistID: todolistID, title: newTodolistTitle}
// }
//
//
// export const changeTaskStatusAC = (taskID: string, todolistID: string, isDone: boolean): ChangeTaskStatusType => {
//     return {type: 'CHANGE-TASK-STATUS', taskID: '2', todolistID: todolistID, isDone: isDone}
// }
//
// export const changeTaskTitleAC = (taskID: string, todolistID: string, newTitle: string): ChangeTaskTitleType => {
//     return {type: 'CHANGE-TASK-TITLE', taskID: '2', todolistID: todolistID, newTitle: newTitle}
// }
//
// export const AddTasksAC = (): AddTasksActionType => {
//     return {type: 'ADD-TASKS'}
// }