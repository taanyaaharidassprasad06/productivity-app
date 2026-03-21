import '../App.css';
import { useState } from "react";
import { useTasks } from "./TaskContext";
import { useCategories } from "./CategoryContext";
import EditModal from './EditModal';

function Task( { task } ) {
    const { edit, deleteTodo } = useTasks();
    const { categories } = useCategories();
   /* const [name, setName] = useState(task.name);
    const [date, setDate] = useState(task.due);
    const [category, setCategory] = useState(task.category);*/
    const [isEditing, setIsEditing] = useState(false);
    const statusLabels = {
        inactive: "Not Started",
        active: "In Progress",
        complete: "Completed"
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
                <EditModal taskItem={task} onSave={handleSave}/>
            ) : (
                <div className="task" style={{backgroundColor: bgColor}}>
                    <p>{task.name}</p>
                    <p>{task.category}</p>
                    <p onClick={cycleStatus}>{statusLabels[task.status]}</p>
                   {/* <select className="status-select"
                        value={task.status}
                        onChange={(e) => edit(task.id, { status: e.target.value })}
                    >
                        <option value="inactive">Not Started</option>
                        <option value="active">In Progress</option>
                        <option value="complete">Completed</option>
                    </select> */}
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