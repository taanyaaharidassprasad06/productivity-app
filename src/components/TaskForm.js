import '../App.css';
import { useState } from "react";
import { useTasks } from "./TaskContext";
import { useCategories } from "./CategoryContext";

function TaskForm() {
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

    return (
        <div>
            <form onSubmit={submitHandler}>
                <fieldset className="todo-form">
                    <div>
                        <label className="label-name" htmlFor="name">ToDo: </label>
                        <input className="input-field"
                            id="name" 
                            type="text" 
                            placeholder="enter task name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label-name" htmlFor="due">Due Date: </label>
                        <input className="input-field"
                            id="due" 
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="none"> </option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                    <button className="action-btn" type="submit" disabled={!name}>✚</button>
                </fieldset>
            </form>
        </div>
    );
}

export default TaskForm;