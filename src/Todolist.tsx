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
    changeStatus: (id: string, isDone: boolean) => void;
    filter:string;
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (value: ChangeEvent<HTMLInputElement>) => {
        setTitle(value.currentTarget.value)
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title);
            setTitle('');

        } else {
            setError('Title is required');
        }
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.charCode === 13) {
            addTask();
        }
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
        const onChangeHandler = (id: string, isDone: boolean) => {
            props.changeStatus(id, isDone)
        }

        return (
            <div>
                <div><h3>{props.title}</h3></div>
                <div>
                    <input className={error ? 'error' : ''} value={title}
                           onChange={onNewTitleChangeHandler}
                           onKeyPress={onKeyPressHandler}
                    />
                    <button onClick={addTask}>Add</button>
                    {error && <div className={'error-message'}>{error}</div>}
                </div>
                <ul>
                    {
                        props.tasks.map((element) => {
                            const onRemoveHandler = () => {
                                props.resultTasks(element.id)
                            }
                            return <li key={element.id}>
                                <button onClick={onRemoveHandler}>X</button>
                                <input onClick={() => onChangeHandler(element.id, element.isDone)} type="checkbox"
                                       checked={element.isDone}/>
                                <span  className={element.isDone ? 'is-done' :''}>{element.title}</span>
                            </li>
                        })
                    }
                </ul>

                <div>
                    <button className={props.filter=='all' ? 'active-filter' :''} onClick={onAllClickHandler}>All</button>
                    <button className={props.filter=='active' ? 'active-filter' :''} onClick={onActiveClickHandler}>Active</button>
                    <button className={props.filter=='completed' ? 'active-filter' :''} onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>
        )
    }

