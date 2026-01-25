import { useState } from "react";
import { useCategories } from "./CategoryContext";

function CategorySelection( { selectedCategory, onSelectChange } ) {
    const { categories, setCategories } = useCategories();
    const [isManaging, setIsManaging] = useState(false);
    const [input, setInput] = useState("");
    const [colorInput, setColorInput] = useState("#ffffff");

    const addFilter = () => {
        const newFilter = input.trim();
        if(newFilter) {
            setCategories([...categories, {name: newFilter, color: colorInput}]);
            setInput("");
            setColorInput("#ffffff");
        }
    }

    const deleteFilter = (index) => {
        const remainingcategories = [
            ...categories.slice(0, index),
            ...categories.slice(index + 1)
        ];

        setCategories(remainingcategories);
    }

    return (
        <div>
        {!isManaging ? (
            <div>
                <select
                    value={selectedCategory}
                    onChange={(e) => onSelectChange(e.target.value)}
                >
                    <option value="" disabled>Select Filter</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category.name}>{category.name}</option>
                    ))}
                </select>
                <button type="button" onClick={() => setIsManaging(true)}>Manage Categories</button>
            </div>
        ) : (
            <div>
                <div>
                    <input 
                        type="text"
                        placeholder="Add filter..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <input 
                        type="color"
                        value={colorInput}
                        onChange={(e) => setColorInput(e.target.value)}
                    />
                    <button type="button" onClick={addFilter}>Add</button>
                </div>
                <div>
                    {categories.map((category, index) => (
                        <div key={index}>
                            <span>{category.name}</span>
                            <button type="button" onClick={() => deleteFilter(index)}>X</button>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={() => setIsManaging(false)}>Save Changes</button>
            </div>
        )}
        </div>
    );

}

export default CategorySelection;