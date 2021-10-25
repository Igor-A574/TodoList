import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const taskJSXElements = props.tasks.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id)}>x</button>
            </li>
        )
    })

    const addTask = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
            props.addTask(trimTitle)
            setTitle("")
        }
    }
    const setAll = () => {props.changeFilter("all")}
    const setActive = () => {props.changeFilter("active")}
    const setCompleted = () => {props.changeFilter("completed")}
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {setTitle(event.currentTarget.value)}
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {if (e.key === "Enter") {addTask()}}

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    placeholder={""}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddTask}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {taskJSXElements}
            </ul>
            <div>
                <button
                    onClick={setAll}
                >All
                </button>
                <button
                    onClick={setActive}
                >Active
                </button>
                <button
                    onClick={setCompleted}
                >Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;