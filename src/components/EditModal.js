import { useState } from "react";
import { useCategories } from "./CategoryContext";

function EditModal({ taskItem, onSave, toggleEditView }) {
    const [name, setName] = useState(taskItem.name);
    const [date, setDate] = useState(taskItem.due);
    const [category, setCategory] = useState(taskItem.category);
    const [status, setStatus] = useState(taskItem.status);
    const { categories } = useCategories();

    const handleSave = () => {
        onSave({name, due: date, category, status})
    }

    return (
        <div className="modal-overlay">
            <div className="task-modal">
                <label className="edit-label-name" htmlFor="name">TASK DETAILS: </label>
                <input 
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="task-details">
                    <div className="assign-list">
                        <label className="edit-label-name" htmlFor="category">ASSIGNED LIST: </label>
                        <select 
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="none"> </option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="set-due">
                        <label className="edit-label-name" htmlFor="due">DEADLINE: </label>
                        <input 
                            id="due"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>
                <p className="edit-label-name">CURRENT STATUS:</p>
                <div className="status-btns">
                    <button 
                        onClick={(e) => setStatus("inactive")}
                        className={status === "inactive" ? "selected" : "stat-btn"}
                    >Not Started</button>
                    <button 
                        onClick={(e) => setStatus("active")} 
                        className={status === "active" ? "selected" : "stat-btn"}
                    >In Progress</button>
                    <button 
                        onClick={(e) => setStatus("complete")}
                        className={status === "complete" ? "selected" : "stat-btn"}
                    >Completed</button>
                </div>
                <div className="edit-btn-container">
                    <button className="edit-btn" onClick={() => toggleEditView(false)}>Discard</button>
                    <button className="edit-btn" onClick={handleSave}>Save</button>
                </div>
                
            </div>
        </div>
        
    );
}

export default EditModal;