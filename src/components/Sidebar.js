import { useState } from "react";
import ListModal from "./ListModal";
import { useCategories } from "./CategoryContext";

function Sidebar({ setCategoryFilter }) {
    const [isListModalOpen, setIsListModalOpen] = useState(false);
    const { categories } = useCategories()

    return (
        <div className="sidebar">
            <h4>Navigation</h4>
            <div className="list-settings">
                <p className="my-list">My Lists</p>
                <button className="list-settings-btn" onClick={() => {setIsListModalOpen(!isListModalOpen)}}>⛭</button>
            </div>

            {isListModalOpen && <ListModal onClose={() => setIsListModalOpen(false)}/>}
            <div 
                className="category-settings"
                onClick={() => setCategoryFilter("")}
            >All</div>
            <div 
                className="category-settings"
                onClick={() => setCategoryFilter("unfiltered")}
            >Unfiltered</div>
            {categories.map((category, index) => (
                <div key={index}
                    className="category-settings"
                    onClick={() => setCategoryFilter(category.name)}
                >
                    <div className="circle" style={{backgroundColor: category.color}}></div>
                    <div key={index}>{category.name}</div>
                </div> 
            ))}

        </div>
    );
}

export default Sidebar;