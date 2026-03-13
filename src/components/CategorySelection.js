import '../App.css';
import { useState} from "react";
import { useCategories } from "./CategoryContext";

function CategorySelection( { selectedCategory, onSelectChange, hideManage } ) {
    const { categories, setCategories } = useCategories();
    const [isManaging, setIsManaging] = useState(false);
    const [input, setInput] = useState("");
    const [colorInput, setColorInput] = useState("#ffffff");
    const [editingIndex, setEditingIndex] = useState(false);

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

    const editFilter = (index, updates) => {
        setCategories(categories.map((category, i) => (
            i === index ? {...category, ...updates} : category
        )))
    }

    return (
        <div>
        {!isManaging ? (
            <div>
                <select className="category-select"
                    value={selectedCategory}
                    onChange={(e) => onSelectChange(e.target.value)}
                >
                    <option value="" disabled>Select Filter</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category.name}>{category.name}</option>
                    ))}
                </select>
                {!hideManage && (
                    <button className="action-btn category-btn" type="button" onClick={() => setIsManaging(true)}>✎</button>
                )}
            </div>
        ) : (
            <div className="category-settings">
                <div className="customize-filter">
                    <input className="input-field"
                        type="text"
                        placeholder="Add filter..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if(e.key === "Enter") {
                                e.preventDefault();
                                addFilter();
                            }
                        }}
                    />
                    <input className="color-selection"
                        type="color"
                        value={colorInput}
                        onChange={(e) => setColorInput(e.target.value)}
                    />
                    <button className="action-btn create-task-btn" type="button" onClick={addFilter}>+</button>
                </div>
                <div>
                    {categories.map((category, index) => (
                        <div key={index}>
                            {editingIndex === index ? (
                                <div className="customize-filter">
                                    <input className="edit-filter"
                                        type="text"
                                        value={category.name}
                                        onChange={(e) => editFilter(index, { name: e.target.value })}
                                    />
                                    <input className="color-selection"
                                        type="color"
                                        value={category.color}
                                        onChange={(e) => editFilter(index, { color: e.target.value })}
                                    />
                                    <button className="action-btn" type="button" onClick={() => setEditingIndex(null)}>✓</button>
                                </div>
                               
                            ) : (
                                <div className="filter-list">
                                    <span className="filter-name" style={{backgroundColor: category.color}}>{category.name}</span>
                                    <div className="edit-category-btn">
                                        <button className="action-btn" type="button" onClick={() => setEditingIndex(index)}>✎</button>
                                        <button className="action-btn del-btn" type="button" onClick={() => deleteFilter(index)}><b>x</b></button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <button className="action-btn" type="button" onClick={() => setIsManaging(false)}>✓</button>
            </div>
        )}
        </div>
    );

}

export default CategorySelection;