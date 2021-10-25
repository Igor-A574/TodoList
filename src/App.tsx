import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"
// C-"R"-UD
// CLI -> GUI -> UI
function App() {
    const [tasks, setTasks] = React.useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ])
    const [filter, setFilter] = React.useState<FilterValuesType>("all")

    // const setTasks = result[1]
    // const tasks = result[0]
    // let tasks: Array<TaskType> = [  // TaskType []
    //     {id: 1, title: "HTML", isDone: true},
    //     {id: 2, title: "CSS", isDone: true},
    //     {id: 3, title: "React", isDone: false},
    //     {id: 4, title: "Redux", isDone: false},
    // ]
    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
        console.log(tasks)
    }


    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }


    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }


    //UI
    let taskForRender: Array<TaskType> = tasks
    if (filter === "active") {
        taskForRender = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        taskForRender = tasks.filter(t => t.isDone)
    }


    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={taskForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
