import { useEffect, useState } from "react";
import { useCategories } from "./CategoryContext";

function ListModal( { editIndex, onClose } ) {
    const [name, setName] = useState("");
    const [color, setColor] = useState("#ffffff");
    const { categories, setCategories } = useCategories();

    const addCategory = () => {
        const newCategory = name.trim()
        if (newCategory) {
            setCategories([...categories, {name, color}]);
            setName("");
            setColor("#ffffff");
        }
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

    // when editIndex changes (when user clicks edit button) populate modal with category's current name and color
    // useEffect runs when dependency array values change so here it runs when editIndex changes to pre-fill inputs
    // if dependency array is empty, it only runs once when component mounts (first time a component is rendered)
    useEffect(() => {
        if(editIndex !== null) {
            setName(categories[editIndex].name);
            setColor(categories[editIndex].color);
        }
    }, [editIndex, categories])

    return (
        <div>
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
            <button onClick={() => {addCategory(); onClose();}}>+ List</button>
            {editIndex !== null && <button onClick={() => {editCategory(); onClose();}}>Save</button>}
        </div>
    );
    
}

export default ListModal;