import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    type TodoListType = {
        id: string;
        title: string;
        filter: FilterValuesType;
    }

    type TaskStateType = {
        [key: string]: Array<TaskType>
    }
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to Learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TaskStateType>(
        {
            [todoListId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
            ],
            [todoListId2]: [
                {id: v1(), title: "SaSS", isDone: true},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ]
        }
    )

    function removeTodolist(todoListId: string) {
        delete tasks[todoListId];
        setTasks({...tasks})
        setTodolists(todolists.filter(f => f.id !== todoListId))
    }

    function removeTask(id: string, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = todoListTasks.filter(f => f.id !== id);
        setTasks({...tasks});
    }

    const addTask = (title: string, todoListId: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = [newTask, ...todoListTasks]
        setTasks({...tasks});
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todolists.find(f => f.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodolists([...todolists])
        }
    }


    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        let task = todoListTasks.find(f => f.id === id);
        if (task) {
            task.isDone = !isDone;
            setTasks({...tasks})
        }
    }

    return (
        <div className="App">
            {
                todolists.map(m => {
                    let tasksForTodolist = tasks[m.id];
                    if (m.filter === "active") {
                        tasksForTodolist = tasks[m.id].filter(t => t.isDone === false);
                    }
                    if (m.filter === "completed") {
                        tasksForTodolist = tasks[m.id].filter(t => t.isDone === true);
                    }
                    return (
                        <Todolist
                            key={m.id}
                            id={m.id}
                            title={m.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={m.filter}
                            deleteTodolist={removeTodolist}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
