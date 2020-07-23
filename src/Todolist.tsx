import React, {useState} from 'react';
import {FilterValuesType} from './App';

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
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    let deleteTodol = () => {
        props.deleteTodolist(props.id)
    }

    function onAddTaskClick(todoListId: string) {
        if (title.trim() !== '') {
            props.addTask(title, todoListId);
            setTitle('');
            setError('')
        } else {
            setError(' Title is required')
        }
    }

    function onChangeFoo(event: HTMLInputElement) {
        setTitle(event.value)
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

    return <div>
        <button onClick={deleteTodol}>X</button>
        <span className={'title'} key={props.key}>{props.title}</span>
        <div>
            <input
                value={title} onChange={(event) => {
                onChangeFoo(event.currentTarget)
            }}
                onKeyPress={(event) => {
                    if (event.charCode === 13) {
                        onAddTaskClick(props.id);
                    }
                }}
                className={error ? 'error' : ''}
            />
            <button onClick={() => {
                onAddTaskClick(props.id)
            }}>add
            </button>
            {<div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <button onClick={() => {
                        props.removeTask(t.id, props.id)
                    }}>x
                    </button>
                    <input onClick={() => {
                        props.changeStatus(t.id, t.isDone, props.id)
                    }} type="checkbox" checked={t.isDone}/>
                    <span className={t.isDone && props.filter === 'all' ? 'is-done' : ''}>{t.title}</span>
                </li>)
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={() => {
                OnCgangeFilterAll()
            }}>All
            </button>
            <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={() => {
                OnCgangeFilterActive()
            }}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={() => {
                OnCgangeFilterCompleted()
            }}>Completed
            </button>
        </div>
    </div>
}
