import '../App.css';
import { useState } from "react";
import { useTasks } from "./TaskContext";
import { useCategories } from "./CategoryContext";
import EditModal from './EditModal';

function Task( { task } ) {
    const { edit, deleteTodo } = useTasks();
    const { categories } = useCategories();
    const [isEditing, setIsEditing] = useState(false);
    const statusLabels = {
        inactive: "NOT STARTED",
        active: "IN PROGRESS",
        complete: "COMPLETED"
    };
    const statusColors = {
        inactive: "#f3b4b3",
        active: "#f2e8ac",
        complete: "#d0efbc"
    };

    // returns category object that matches task's category name or undefined if not found
    const categoryObj = categories.find(category => category.name === task.category);
    // if categoryObj is found use its color else use white
    const bgColor = categoryObj ? categoryObj.color : "#ffffff";

    const handleSave = (updates) => {
        edit(task.id, updates);
        setIsEditing(false);
    }

    // does not need useState because it is an immediate action - one click
    // EditModal needs useState because it needs to temporarily hold the changes user makes
    const cycleStatus = () => {
        const statusArr = ["inactive", "active", "complete"];
        const currIndex = statusArr.indexOf(task.status);
        const nextIndex = (currIndex + 1) % statusArr.length;
        edit(task.id, { status: statusArr[nextIndex] });
    }

    return (
        <div>
            {isEditing ? (
                <EditModal taskItem={task} onSave={handleSave} toggleEditView={setIsEditing}/>
            ) : (
                <div className="task" style={{backgroundColor: bgColor}}>
                    <div>
                        <p><b>{task.name}</b>
                            {task.category === "unfiltered" ? "" : " (" + task.category + ")"}
                        </p>
                        <div className="task-info">
                            <p className="status-info" onClick={cycleStatus} style={{backgroundColor: statusColors[task.status]}}>{statusLabels[task.status]}</p>
                            <p><i>{task.due}</i></p>
                        </div>
                    </div>
                    <div className="task-action-btns">
                        <button className="action-btn" onClick={() => setIsEditing(true)}>✎</button>
                        <button className="action-btn" onClick={() => deleteTodo(task.id)}>❌</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Task;