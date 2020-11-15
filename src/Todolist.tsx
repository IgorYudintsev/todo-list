import React, {useState, KeyboardEvent, ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditTableSpan} from "./EditTableSpan";
import {Button, FormControlLabel} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    key: string
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    deleteTodolist: (idDelete: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListId: string) => void
    changeTodolistTitle: (todoListId: string, newTitle: string) => void
}

export const Todolist=React.memo(function(props: PropsType) {
    const deleteTodol = useCallback(() => {
        props.deleteTodolist(props.id)
    },[props.deleteTodolist,props.id])
    const OnCgangeFilterAll=useCallback(function() {
        props.changeFilter("all", props.id)
    },[ props.changeFilter,props.id])
    const OnCgangeFilterActive=useCallback(function() {
        props.changeFilter("active", props.id)
    },[ props.changeFilter,props.id]);
    const OnCgangeFilterCompleted=useCallback(function() {
        props.changeFilter("completed", props.id)
    },[props.changeFilter,props.id]);
    const addTask=useCallback((title: string) =>{
        props.addTask(title, props.id)
    },[props.addTask,props.id])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    },[ props.changeTodolistTitle,props.id])

    let tasksForTodolist=props.tasks
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    return <div>
        <h3><Button onClick={deleteTodol}
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<DeleteIcon/>}
        >Delete</Button></h3>
        <EditTableSpan title={props.title} saveNewTitle={changeTodolistTitle}/>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    return <Task
                        task={t}
                        removeTask={props.removeTask}
                        changeStatus={props.changeStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        todolistId={props.id}
                    />
                })
            }
        </div>
        <div>
            <Button variant="contained" color={props.filter === 'all' ? "secondary" : "primary"} onClick={() => {
                OnCgangeFilterAll()
            }}>All
            </Button>
            <Button variant="contained" color={props.filter === 'active' ? "secondary" : "primary"} onClick={() => {
                OnCgangeFilterActive()
            }}>Active
            </Button>
            <Button variant="contained" color={props.filter === 'completed' ? "secondary" : "primary"} onClick={() => {
                OnCgangeFilterCompleted()
            }}>Completed
            </Button>
        </div>
    </div>
})



type PropsTypeTask = {
    task: TaskType,
    removeTask: (taskId: string, todoListId: string) => void
    todolistId: string
    changeTaskTitle: (taskID: string, newTitle: string, todoListId: string) => void
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
}

const Task = React.memo((props: PropsTypeTask) => {
    const changeTaskTitle = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.task.id)
    },[])
    const removeTask = useCallback(
        () => props.removeTask(props.task.id, props.todolistId)
        , [
            props.todolistId,
            props.task.id,
            props.removeTask
        ]
    )
    const onChangeHandler = useCallback((e:ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue=e.currentTarget.checked
        props.changeStatus(props.task.id, newIsDoneValue, props.todolistId)
    },[props.changeStatus,props.task.id, props.todolistId])
    return <div key={props.task.id}>
        <IconButton onClick={removeTask} aria-label="delete">
            <DeleteIcon/>
        </IconButton>
        <FormControlLabel
            onClick={() => {
                props.changeStatus(props.task.id, props.task.isDone, props.todolistId)
            }}
            control={
                <Checkbox checked={props.task.isDone} onChange={onChangeHandler} name="checkedA"/>}
            label=""
        />
        <EditTableSpan title={props.task.title} saveNewTitle={changeTaskTitle}/>
    </div>
})