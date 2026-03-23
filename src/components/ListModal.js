import { useState } from "react";
import { useCategories } from "./CategoryContext";
import { useTasks } from "./TaskContext";

function ListModal( { onClose } ) {
    const [name, setName] = useState("");
    const [color, setColor] = useState("#ffffff");
    const [editIndex, setEditIndex] = useState(null);
    const { categories, setCategories } = useCategories();
    const { editCategoryName } = useTasks();

    const addCategory = () => {
        const newCategory = name.trim()
        if (newCategory) {
            setCategories([...categories, {name, color}]);
            setName("");
            setColor("#ffffff");
        }
    }

    const startEdit = (index) => {
        setEditIndex(index);
        setName(categories[index].name);
        setColor(categories[index].color);
    }

    const editCategory = () => {
        if(editIndex !== null) {
            setCategories(categories.map((category, index) => (
                index === editIndex ? {...category, name, color} : category
            )))
        }
        setName("");
        setColor("#ffffff");
    }

    const deleteCategory = (index) => {
        const deletedName = categories[index].name
        const remainingCategories = [
            ...categories.slice(0, index),
            ...categories.slice(index + 1)
        ];

        setCategories(remainingCategories);
        editCategoryName(deletedName, "unfiltered");
    }

    return (
        <div className="modal-overlay">
            <div className="list-modal">
                <div className="list-add">
                    <input
                        className="list-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="color-container">
                        <label className="color-header" htmlFor="color-pick">Color:</label>
                        <input 
                            className="color-input"
                            id="color-pick"
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </div>
                    <button className="add-list-btn" onClick={() => addCategory()}>+</button>
                </div>
                
                {categories.map((category, index) => (
                    <div className="category-edit">
                        <div className="category-name">
                            <div className="circle" style={{backgroundColor: category.color}}></div>
                            <div key={index}>{category.name}</div>
                        </div>
                        <div className="category-btn-container">
                            <button className="category-btn" onClick={() => startEdit(index)}>✎</button>
                            <button className="category-btn" onClick={() => deleteCategory(index)}>❌</button>
                        </div>  
                    </div> 
                ))}
                <div className="edit-btn-container">
                    {editIndex !== null && <button className="edit-btn" onClick={() => editCategory()}>Save</button>}
                    <button className="edit-btn" onClick={() => onClose()}>Close</button>
                </div>  
            </div>
        </div>
        
    );
    
}

export default ListModal;