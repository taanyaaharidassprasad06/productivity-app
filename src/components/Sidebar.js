import { useState } from "react";
import ListModal from "./ListModal";
import { useCategories } from "./CategoryContext";

function Sidebar() {
    const [isListModalOpen, setIsListModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const { categories, setCategories } = useCategories()

    const deleteCategory = (index) => {
        const remainingCategories = [
            ...categories.slice(0, index),
            ...categories.slice(index + 1)
        ];
        setCategories(remainingCategories);
    }

    return (
        <div className="sidebar">
            <h4>Navigation</h4>
            <button onClick={() => {setIsListModalOpen(!isListModalOpen); setEditingIndex(null)}}>+ New List</button>

            {isListModalOpen && <ListModal editIndex={editingIndex} onClose={() => setIsListModalOpen(false)}/>}

            {categories.map((category, index) => (
                <div className="category-settings">
                    <div key={index}>{category.name}</div>
                    <button onClick={() => {setIsListModalOpen(true); setEditingIndex(index)}}>Edit</button>
                    <button onClick={() => deleteCategory(index)}>Delete</button>
                </div> 
            ))}

        </div>
    );
}

export default Sidebar;