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

    function addTask(title:string){
        let newTask= {id: v1(), title:title, isDone: false};
        setTasks([newTask, ...tasks])
    }

    function resultTasks(id: string) {
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
                addTask={addTask}
            />
        </div>
    );
}
export default App;

