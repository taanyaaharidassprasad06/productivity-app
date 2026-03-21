import { useState } from "react";
import { useCategories } from "./CategoryContext";

function EditModal({ taskItem, onSave }) {
    const [name, setName] = useState(taskItem.name);
    const [date, setDate] = useState(taskItem.due);
    const [category, setCategory] = useState(taskItem.category);
    const [status, setStatus] = useState(taskItem.status);
    const { categories } = useCategories();

    const handleSave = () => {
        onSave({name, due: date, category, status})
    }

    return (
        <div>
            <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="none"> </option>
                {categories.map((category, index) => (
                    <option key={index} value={category.name}>{category.name}</option>
                ))}
            </select>
            <div>
                <button onClick={(e) => setStatus("inactive")}>Not Started</button>
                <button onClick={(e) => setStatus("active")}>In Progress</button>
                <button onClick={(e) => setStatus("complete")}>Completed</button>
            </div>
            <button className="action-btn" onClick={handleSave}>✓</button>
        </div>
    );
}

export default EditModal;