import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
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

export function Todolist(props: PropsType) {
    let deleteTodol = () => {
        props.deleteTodolist(props.id)
    }

    function OnCgangeFilterAll() {
        props.changeFilter("all", props.id)
    }

    function OnCgangeFilterActive() {
        props.changeFilter("active", props.id)
    }

    function OnCgangeFilterCompleted() {
        props.changeFilter("completed", props.id)
    }

    function addTask(title: string) {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
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
                props.tasks.map(t => {
                    const changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(t.id, newTitle, props.id)
                    }
                    return (
                        <div key={t.id}>
                            <IconButton onClick={() => {
                                props.removeTask(t.id, props.id)
                            }} aria-label="delete">
                                <DeleteIcon/>
                            </IconButton>
                            <FormControlLabel
                                onClick={() => {
                                    props.changeStatus(t.id, t.isDone, props.id)
                                }}
                                control={<Checkbox checked={t.isDone} name="checkedA"/>}
                                label=""
                            />
                            <EditTableSpan title={t.title} saveNewTitle={changeTaskTitle}/>
                        </div>
                    )
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
}

//==================================================
// import React, {useState, KeyboardEvent} from 'react';
// import {FilterValuesType} from './App';
//
// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
// type PropsType = {
//     key: string
//     id: string
//     title: string
//     tasks: Array<TaskType>
//     removeTask: (taskId: string, todoListId: string) => void
//     changeFilter: (value: FilterValuesType, todolistId: string) => void
//     addTask: (title: string, todolistId: string) => void
//     changeStatus: (id: string, isDone: boolean, todoListId: string) => void
//     filter: FilterValuesType
//     deleteTodolist: (idDelete: string) => void
// }
//
// export function Todolist(props: PropsType) {
//
//     let [title, setTitle] = useState<string>('');
//     let [error, setError] = useState<string | null>(null);
//
//     let deleteTodol = () => {
//         props.deleteTodolist(props.id)
//     }
//
//     function onAddTaskClick(todoListId: string) {
//         if (title.trim() !== '') {
//             props.addTask(title, todoListId);
//             setTitle('');
//             setError('')
//         } else {
//             setError(' Title is required')
//         }
//     }
//
//     function onChangeFoo(event: HTMLInputElement) {
//         setTitle(event.value)
//     }
//
//     const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
//         if (event.charCode === 13) {
//             onAddTaskClick(props.id);
//         }
//     }
//
//
//     function OnCgangeFilterAll() {
//         props.changeFilter("all", props.id)
//     }
//
//     function OnCgangeFilterActive() {
//         props.changeFilter("active", props.id)
//     }
//
//     function OnCgangeFilterCompleted() {
//         props.changeFilter("completed", props.id)
//     }
//
//     return <div>
//         <button onClick={deleteTodol}>X</button>
//         <span className={'title'} key={props.key}>{props.title}</span>
//         <div>
//             <input
//                 value={title}
//                 onChange={(event) => {
//                     onChangeFoo(event.currentTarget)
//                 }}
//                 onKeyPress={onKeyPressHandler}
//                 className={error ? 'error' : ''}
//             />
//             <button onClick={() => {
//                 onAddTaskClick(props.id)
//             }}>add
//             </button>
//             {<div className="error-message">{error}</div>}
//         </div>
//         <ul>
//             {
//                 props.tasks.map(t => <li key={t.id}>
//                     <button onClick={() => {
//                         props.removeTask(t.id, props.id)
//                     }}>x
//                     </button>
//                     <input onClick={() => {
//                         props.changeStatus(t.id, t.isDone, props.id)
//                     }} type="checkbox" checked={t.isDone}/>
//                     <span className={t.isDone && props.filter === 'all' ? 'is-done' : ''}>{t.title}</span>
//                 </li>)
//             }
//         </ul>
//         <div>
//             <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={() => {
//                 OnCgangeFilterAll()
//             }}>All
//             </button>
//             <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={() => {
//                 OnCgangeFilterActive()
//             }}>Active
//             </button>
//             <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={() => {
//                 OnCgangeFilterCompleted()
//             }}>Completed
//             </button>
//         </div>
//     </div>
// }