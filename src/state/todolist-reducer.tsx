import React, {useState} from 'react';
import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID:string
}
export type ChangeTodolistTitleTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
    }
export type FilterValuesTypeTodolistActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
type ActionType = RemoveTodolistActionType|AddTodolistActionType|
    ChangeTodolistTitleTodolistActionType|FilterValuesTypeTodolistActionType



let initialState:Array<TodoListType>=[
    {id: 'todoListId1', title: 'What to Learn', filter: 'all'},
    {id: 'todoListId2', title: 'What to buy', filter: 'all'}
]

export const TodolistReducer = (state=initialState, action:ActionType  ) => {
    switch (action.type) {
        case'REMOVE-TODOLIST':
            return state.filter(f => f.id !== action.id);
        case'ADD-TODOLIST':
              let newTodoList: TodoListType = {
                id: action.todolistID,
                title: action.title,
                filter: 'all'
            }
                   return [...state, newTodoList];
        case'CHANGE-TODOLIST-TITLE':
            let todoList = state.find(f => f.id === action.id);
            if (todoList) {
                todoList.title = action.title;
                return [...state];
            }
            return state
        case'CHANGE-TODOLIST-FILTER':
            let todoList2 = state.find(f => f.id === action.id);
            if (todoList2) {
                todoList2.filter = action.filter;
                return [...state];
            }
            return state;
        default:
           return state
    }
}



export const RemoveTodolistAC=(todolistID:string):RemoveTodolistActionType=>{
    return {type:'REMOVE-TODOLIST',id:todolistID}
}

export const AddTodolistAC=(newTodolistTitle:string):AddTodolistActionType=>{
    return {type:'ADD-TODOLIST',title:newTodolistTitle,todolistID:v1()}//сгенерировали ID
}

export const ChangeTodolistAC=(todolistId:string,newTodolistTitle:string):ChangeTodolistTitleTodolistActionType=>{
    return { type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: newTodolistTitle}
}

export const FilterTodolistAC=(todolistId:string,todolistFilter:FilterValuesType):FilterValuesTypeTodolistActionType=>{
    return {type: "CHANGE-TODOLIST-FILTER",id: todolistId ,filter:todolistFilter}

}

