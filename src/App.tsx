import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ])

    function resultTasks(id: number) {
        tasks = tasks.filter(f => f.id !== id);
        setTasks(tasks);
    }

    let tasksForTodolist = tasks;
    let [filter, setFilter] = useState('all');

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(f => f.isDone === true)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(f => f.isDone === false)
    }

    function  changeFilter(value: string) {
        setFilter(value);
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                resultTasks={resultTasks}
                changeFilter={ changeFilter}
            />
        </div>
    );
}
export default App;

