import { useState } from "react";
import ListModal from "./ListModal";
import { useCategories } from "./CategoryContext";

function Sidebar() {
    const [isListModalOpen, setIsListModalOpen] = useState(false);
    const { categories } = useCategories()

    return (
        <div className="sidebar">
            <h4>Navigation</h4>
            <div>
                <h6>My Lists</h6>
                <button onClick={() => {setIsListModalOpen(!isListModalOpen)}}>⛭</button>
            </div>

            {isListModalOpen && <ListModal onClose={() => setIsListModalOpen(false)}/>}

            {categories.map((category, index) => (
                <div className="category-settings" style={{backgroundColor: category.color}}>
                    <div key={index}>{category.name}</div>
                </div> 
            ))}

        </div>
    );
}

export default Sidebar;