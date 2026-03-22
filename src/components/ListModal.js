import { useState } from "react";
import { useCategories } from "./CategoryContext";

function ListModal( { onClose } ) {
    const [name, setName] = useState("");
    const [color, setColor] = useState("#ffffff");
    const [editIndex, setEditIndex] = useState(null);
    const { categories, setCategories } = useCategories();

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
        const remainingCategories = [
            ...categories.slice(0, index),
            ...categories.slice(index + 1)
        ];
        setCategories(remainingCategories);
    }

    return (
        <div className="modal-overlay">
            <div className="list-modal">
                <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <input className="color-selection"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
                <button onClick={() => addCategory()}>+ List</button>
                {categories.map((category, index) => (
                    <div className="category-settings" style={{backgroundColor: category.color}}>
                        <div key={index}>{category.name}</div>
                        <button onClick={() => startEdit(index)}>✎</button>
                        <button onClick={() => deleteCategory(index)}>❌</button>
                    </div> 
                ))}
                {editIndex !== null && <button onClick={() => editCategory()}>Save</button>}
                <button onClick={() => onClose()}>Close</button>
            </div>
        </div>
        
    );
    
}

export default ListModal;