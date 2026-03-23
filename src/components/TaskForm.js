import '../App.css';
import { useState, useEffect } from "react";
import { useTasks } from "./TaskContext";
import { useCategories } from "./CategoryContext";

function TaskForm({ defaultCategory }) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const { add } = useTasks();
    const { categories } = useCategories();

    const submitHandler = (e) => {
        e.preventDefault();

        const newTask = {
            id: Date.now(),
            name,
            due: date,
            category,
            status: "inactive"
        }

        add(newTask);

        setName("");
        setDate("");
        setCategory("");
    }

    useEffect(() => {
        setCategory(defaultCategory || "");
    }, [defaultCategory]);

    return (
        <div>
            <form onSubmit={submitHandler}>
                <fieldset className="todo-form">
                    <div className="name-container">
                        <input className="name-field"
                            type="text" 
                            placeholder="What needs to be done?"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="date-list-container">
                        <div>
                            <input className="date-field"
                                id="due" 
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        {!defaultCategory && 
                        <select
                            className="category-field" 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="" disabled>Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                        }
                        <button className="action-btn" type="submit" disabled={!name}>✚</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default TaskForm;