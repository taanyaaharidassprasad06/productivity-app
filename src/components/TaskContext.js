import { createContext, useState, useContext } from "react";

const TaskContext = createContext();

export function TaskProvider( { children} ) {
    const [todos, setTodos] = useState([]);
    

    const add = (newTask) => {
        setTodos([...todos, newTask]);
    }

    const edit = (id, updates) => {
        setTodos(todos.map(todo => (
            todo.id === id ? {...todo, ...updates} : todo
        )));
    }

    const deleteTodo = (id) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
    }

    return (
        <TaskContext.Provider value={{ todos, add, edit, deleteTodo }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    return useContext(TaskContext);
}