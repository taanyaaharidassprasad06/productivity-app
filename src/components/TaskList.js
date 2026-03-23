import '../App.css';
import { useTasks } from "./TaskContext";
import { useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";

function TaskList({ categoryFilter }) {
    // Get tasks and categories from context
    const { todos } = useTasks();
    
    const [statusFilter, setStatusFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    const filteredTodos = todos
        .filter((todo) => {
            if(!categoryFilter) return true; 
            if(categoryFilter === "unfiltered") return todo.category === "";
            return categoryFilter === todo.category
        })
        .filter((todo) => !statusFilter || statusFilter === todo.status)
        .sort((a, b) => {
            if(!sortOrder) return 0;
            const dateA = new Date(a.due);
            const dateB = new Date(b.due);
            return sortOrder === "nearest" ? dateA - dateB : dateB - dateA;

        })

    return (
        <div className="task-list">
            <TaskForm defaultCategory={categoryFilter}/>

            <div className="filter-by">
                <select className="filter-by-val" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">All</option>
                    <option value="inactive">Not Started</option>
                    <option value="active">In Progress</option>
                    <option value="complete">Completed</option>
                </select>

                <select className="filter-by-val" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="">All</option>
                    <option value="nearest">Nearest</option>
                    <option value="farthest">Farthest</option>
                </select>
            </div>

            {filteredTodos.map(todo => (
                <Task key={todo.id} task={todo}/>
            ))}
        </div>
    );

}

export default TaskList;