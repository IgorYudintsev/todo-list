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

let todolistId1: string
let todolistId2: string
let startState: Array<TodoListType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {

    let startStateTask = {
        [todolistId1]: [],
        [todolistId2]: []
    }

    const action = RemoveTodolistAC(todolistId1);
    const endStateTodolist = TodolistReducer(startState, action)//по новому
    const endStateTask = tasksReducer(startStateTask, action)//по новому
    const TasksID = Object.keys(endStateTask);


    expect(endStateTodolist.length).toBe(1);
    expect(endStateTodolist[0].id).toBe(todolistId2);
    expect(TasksID.length).toBe(1);
});
test('correct todolist should be added', () => {


    let newTodolistTitle = "New Todolist";


    let startStateTask = {
        [todolistId1]: [],
        [todolistId2]: []
    }

    const action = AddTodolistAC(newTodolistTitle)

    const endStateTodolist = TodolistReducer(startState, action)
    const endStateTasks = tasksReducer(startStateTask, action)

    const todolistID = endStateTodolist[2].id
    const TasksID = Object.keys(endStateTasks);

    expect(todolistID).toBe(TasksID[2]);

    expect(endStateTodolist.length).toBe(3);
    expect(endStateTodolist[2].title).toBe(newTodolistTitle);
});
test('correct todolist should change its name', () => {
    let newTodolistTitle: string = "New Todolist";
    const endState = TodolistReducer(startState, ChangeTodolistAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";
    const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId2,
        filter: newFilter
    };

    const endState = TodolistReducer(startState, FilterTodolistAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});




