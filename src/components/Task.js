import '../App.css';
import { useState } from "react";
import { useTasks } from "./TaskContext";
import { useCategories } from "./CategoryContext";
import TaskEdit from "./TaskEdit";

function Task( { task } ) {
    const { edit } = useTasks();
    const { categories } = useCategories();
    const [isEditing, setIsEditing] = useState(false);

    // returns category object that matches task's category name or undefined if not found
    const categoryObj = categories.find(category => category.name === task.category);
    // if categoryObj is found use its color else use white
    const bgColor = categoryObj ? categoryObj.color : "#ffffff";

    // Flow of editing a task: 
    // 1. Task renders TaskEdit when isEditing = true 
    // 2. Task passes its handleSave function to TaskEdit as the prop "onSave" 
    // 3. User edits fields in TaskEdit (name, due date, category) 
    // 4. TaskEdit.handleSave() collects the updated values into an "updates" object 
    // 5. TaskEdit calls onSave(updates) → this actually calls Task.handleSave() 
    // 6. Task.handleSave() calls edit(task.id, updates) from TaskContext to update the task 
    // 7. Task then sets isEditing = false to exit edit mode
    const handleSave = (updates) => {
        edit(task.id, updates);
        setIsEditing(false);
    }

    return (
        <div>
            {isEditing ? (
                <TaskEdit
                    task={task}
                    onSave={handleSave} 
                />
            ) : (
                <div style={{backgroundColor: bgColor}}>
                    <p>{task.name}</p>
                    <p>{task.due}</p>
                    <p>{task.category}</p>
                    <select
                        value={task.status}
                        onChange={(e) => edit(task.id, { status: e.target.value })}
                    >
                        <option value="inactive">Not Started</option>
                        <option value="active">In Progress</option>
                        <option value="complete">Completed</option>
                    </select>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </div>
            )}
            
        </div>
    );
}

export default Task;