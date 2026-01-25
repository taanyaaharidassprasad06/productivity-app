import { useState } from "react";
import { useTasks } from "./TaskContext";
import { useCategories } from "./CategoryContext";
import TaskEdit from "./TaskEdit";

function Task( { task } ) {
    const { edit } = useTasks();
    const { categories } = useCategories();
    const [isEditing, setIsEditing] = useState(false);

    const categoryObj = categories.find(category => category.name === task.category);
    const bgColor = categoryObj ? categoryObj.color : "#ffffff";

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