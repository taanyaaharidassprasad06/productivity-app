import { useState } from "react";
import TaskForm from "./TaskForm";
import Task from "./Task";
import AddModal from "./AddModal";

function TaskList() {
    const [todos, setTodos] = useState([]);
    

    const addTask = (newTask) => {
        setTodos([...todos, newTask]);
    }

    const updateTask = (id, updates) => {
        setTodos(todos.map(todo => (
            todo.id === id ? {...todo, ...updates} : todo
        )));
    }

    return (
        <div>
            <AddModal addTaskHandler={addTask}/>
            {/*<TaskForm addTaskHandler={addTask}/>*/}

            {todos.map(todo => (
                <Task key={todo.id} task={todo} onTaskUpdate={updateTask}/>
            ))}
        </div>
    );

}

export default TaskList;