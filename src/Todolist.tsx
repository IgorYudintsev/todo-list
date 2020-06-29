import React from "react";
import {log} from "util";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string,
    tasks: TaskType[],
    resultTasks:(id:number)=>void;
    changeFilter:(value:string)=>void;
}


export function Todolist(props: PropsType) {
      return (
        <div>
            <div><h3>{props.title}</h3></div>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((element) =>
                        <li key={element.id}>
                            {/*<button onClick={()=>console.log(element.id)}>X</button>*/}
                            <button onClick={()=>props.resultTasks(element.id)}>X</button>
                            <input type="checkbox"
                                   checked={element.isDone}/>
                            <span>{element.title}</span>
                        </li>)
                }
            </ul>
            <div>
                <button onClick={()=>props. changeFilter('all')} >All</button>
                <button onClick={()=>props. changeFilter('active')}>Active</button>
                <button onClick={()=>props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}