//Test-Reducer-ActionCreator(AC)
import {
    AddTodolistAC,
    ChangeTodolistAC,
    FilterTodolistAC,
    RemoveTodolistAC,
    TodolistReducer
} from './todolist-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../App';
import {tasksReducer} from "./tasks-reducer";


test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    let startStateTask={
        [todolistId1]:[],
        [todolistId2]:[]
    }

    const action=RemoveTodolistAC(todolistId1);
    const endStateTodolist = TodolistReducer(startState, action)//по новому
    const endStateTask = tasksReducer(startStateTask, action)//по новому
    // const endState = TodolistReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistId1})
    const TasksID=Object.keys(endStateTask);


    expect(endStateTodolist.length).toBe(1);
    expect(endStateTodolist[0].id).toBe(todolistId2);
    expect(TasksID.length).toBe(1);
});
test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startStateTodolist: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    let startStateTask={
        [todolistId1]:[],
        [todolistId2]:[]
    }

    const action=AddTodolistAC(newTodolistTitle)

    const endStateTodolist = TodolistReducer(startStateTodolist, action)
    const endStateTasks=tasksReducer(startStateTask,action)

    const todolistID=endStateTodolist[2].id
    const TasksID=Object.keys(endStateTasks);


    // const newKey=keys.find(k=>k!=todolistId1 && k!=todolistId2);
    // if(!newKey){
    //     throw Error('new key should be added')
    // }

    expect(todolistID).toBe(TasksID[2]);

    expect(endStateTodolist.length).toBe(3);
    expect(endStateTodolist[2].title).toBe(newTodolistTitle);
});
test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle:string = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const action = {
    //     type: 'CHANGE-TODOLIST-TITLE' as const,
    //     id: todolistId2,
    //     title :newTodolistTitle
    // };

    const endState = TodolistReducer(startState, ChangeTodolistAC(todolistId2,newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId2,
        filter: newFilter
    };

    // const endState = TodolistReducer(startState, action);
    const endState = TodolistReducer(startState, FilterTodolistAC(todolistId2,newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});




