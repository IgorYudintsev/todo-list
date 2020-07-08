import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ])

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks([newTask, ...tasks])
    }

    function resultTasks(id: string) {
        tasks = tasks.filter(f => f.id !== id);
        setTasks(tasks);
    }

    let tasksForTodolist = tasks;
    let [filter, setFilter] = useState('all');
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(f => f.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(f => f.isDone === true)
    }

    function changeFilter(value: string) {
        setFilter(value);
    }

    function changeStatus(id: string, isDone: boolean) {
        let task = tasks.find(f => f.id === id);
        if (task) {
            task.isDone = !isDone;
            setTasks([...tasks])
        }

    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                resultTasks={resultTasks}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;

