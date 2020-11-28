import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {Todolist, TaskType} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {Button, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {Menu} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import {
    AddTodolistAC,
    ChangeTodolistAC,
    FilterTodolistAC,
    RemoveTodolistAC,
    TodolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    let todolists=useSelector<AppRootStateType,Array<TodoListType>>(state => state.todolists)
    let tasks=useSelector<AppRootStateType,TaskStateType>(state => state.tasks)
    let dispatch=useDispatch()

    const removeTask=useCallback((id: string, todoListId: string) =>{
        // let todoListTasks = tasks[todoListId];
        // tasks[todoListId] = todoListTasks.filter(f => f.id !== id);
        // setTasks({...tasks});
        dispatch(removeTaskAC(id, todoListId));
    },[dispatch])
    const addTask =useCallback( (title: string, todoListId: string) => {
        // let newTask = {id: v1(), title: title, isDone: false};
        // let todoListTasks = tasks[todoListId];
        // tasks[todoListId] = [newTask, ...todoListTasks]
        // setTasks({...tasks});
        dispatch(addTaskAC(title, todoListId));
    },[dispatch])
    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListId: string) => {
        // let todoListTasks = tasks[todoListId];
        // let task = todoListTasks.find(f => f.id === taskID);
        // if (task) {
        //     task.title = newTitle;
        //     console.log(todoListId)//
        //     setTasks({...tasks})
        // }
        dispatch(changeTaskTitleAC(taskID, todoListId, newTitle));
    },[dispatch])
    const changeStatus=useCallback(function(id: string, isDone: boolean, todoListId: string) {
        // let todoListTasks = tasks[todoListId];
        // let task = todoListTasks.find(f => f.id === id);
        // if (task) {
        //     task.isDone = !isDone;
        //     setTasks({...tasks})
        // }
        dispatch(changeTaskStatusAC(id, todoListId,isDone));
        // dispatchTasks(changeTaskStatusAC(id,todoListId,isDone));
    },[dispatch])
    const changeTodolistTitle = useCallback((todoListId: string, newTitle: string) => {
        // let todoList = todolists.find(f => f.id === todoListId);
        // if (todoList) {
        //     todoList.title = newTitle;
        //     setTodolists([...todolists])
        // }
        dispatch(ChangeTodolistAC(todoListId, newTitle));
    },[dispatch]
    )
    const removeTodolist=useCallback(function(todoListId: string) {
        // delete tasks[todoListId];
        // setTasks({...tasks})
        // setTodolists(todolists.filter(f => f.id !== todoListId))
        dispatch(RemoveTodolistAC(todoListId));
          },[dispatch])
    const changeFilter=useCallback((value: FilterValuesType, todoListId: string)=>{
        // let todoList = todolists.find(f => f.id === todoListId);
        // if (todoList) {
        //     todoList.filter = value;
        //     setTodolists([...todolists])
        // }
        dispatch(FilterTodolistAC(todoListId,value));
    },[dispatch])
    const addTodoList=useCallback((title: string)=>{
        let action=AddTodolistAC(title)
        dispatch(action);
      },[dispatch]
)

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <p></p>
                <p></p>
                <Grid container spacing={3}>{
                    todolists.map(m => {
                        let allTodolist=tasks[m.id];
                            let tasksForTodolist = allTodolist;
                        return (
                            <Grid item key={m.id}>
                                <Paper style={{padding: '20px'}} elevation={5}>
                                    <Todolist
                                        key={m.id}
                                        id={m.id}
                                        title={m.title}
                                        tasks={allTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={m.filter}
                                        deleteTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
