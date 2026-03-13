import '../App.css';
import { useState } from "react";
import { useTasks } from "./TaskContext";
import { useCategories } from "./CategoryContext";
import CategorySelection from "./CategorySelection";

function Task( { task } ) {
    const { edit, deleteTodo } = useTasks();
    const { categories } = useCategories();
    const [name, setName] = useState(task.name);
    const [date, setDate] = useState(task.due);
    const [category, setCategory] = useState(task.category);
    const [isEditing, setIsEditing] = useState(false);

    // returns category object that matches task's category name or undefined if not found
    const categoryObj = categories.find(category => category.name === task.category);
    // if categoryObj is found use its color else use white
    const bgColor = categoryObj ? categoryObj.color : "#ffffff";

    const handleSave = () => {
        edit(task.id, {name, due: date, category});
        setIsEditing(false);
    }

    return (
        <div>
            {isEditing ? (
                <div className="task" style={{backgroundColor: bgColor}}>
                    <input className="edit-mode"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input className="edit-mode"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <CategorySelection selectedCategory={category} onSelectChange={setCategory} hideManage={isEditing}/>
                    <select className="status-select edit-mode"
                        value={task.status}
                        onChange={(e) => edit(task.id, { status: e.target.value })}
                    >
                        <option value="inactive">Not Started</option>
                        <option value="active">In Progress</option>
                        <option value="complete">Completed</option>
                    </select>
                    <button className="action-btn" onClick={handleSave}>✓</button>
                </div>
            ) : (
                <div className="task" style={{backgroundColor: bgColor}}>
                    <p>{task.name}</p>
                    <p>{task.category}</p>
                    <select className="status-select"
                        value={task.status}
                        onChange={(e) => edit(task.id, { status: e.target.value })}
                    >
                        <option value="inactive">Not Started</option>
                        <option value="active">In Progress</option>
                        <option value="complete">Completed</option>
                    </select>
                    <p>{task.due}</p>
                    <div className="task-action-btns" style={{backgroundColor: bgColor}}>
                        <button className="action-btn" onClick={() => setIsEditing(true)}>✎</button>
                        <button className="action-btn" onClick={() => deleteTodo(task.id)}>❌</button>
                    </div>
                    
                </div>
            )}
            
        </div>
    );
}

export default Task;