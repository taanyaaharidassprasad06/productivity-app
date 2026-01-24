import { useState } from "react";
import { useTasks } from "./TaskContext";
import TaskEdit from "./TaskEdit";

function Task( { task } ) {
    const { edit } = useTasks();
    const [isEditing, setIsEditing] = useState(false);

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
                <div>
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