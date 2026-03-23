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

    const editCategoryName = (oldName, newName) => {
        setTodos(todos.map((todo) => {
            return todo.category === oldName ? {...todo, category: newName} : todo;
        }));
    } 

    return (
        <TaskContext.Provider value={{ todos, add, edit, deleteTodo, editCategoryName }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    return useContext(TaskContext);
}