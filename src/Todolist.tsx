import React, {ChangeEvent, KeyboardEvent, useState} from "react";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string,
    tasks: TaskType[],
    resultTasks: (id: string) => void;
    changeFilter: (value: string) => void;
    addTask: (title: string) => void;
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('');

    const onNewTitleChangeHandler = (value: ChangeEvent<HTMLInputElement>) => {
        setTitle(value.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
            props.addTask(title);
            setTitle('');
        }
    }
    const addTask = () => {
        props.addTask(title)
        setTitle(' ')
    }
    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }

    return (
        <div>
            <div><h3>{props.title}</h3></div>
            <div>
                <input value={title}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>Add</button>
            </div>
            <ul>
                {
                    props.tasks.map((element) => {
                        const onRemoveHandler = () => {
                            props.resultTasks(element.id)
                        }
                        return <li key={element.id}>
                            <button onClick={onRemoveHandler}>X</button>
                            <input type="checkbox" checked={element.isDone}/>
                            <span>{element.title}</span>
                        </li>
                    })
                }
            </ul>

            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}