import '../App.css';
import { useState } from "react";
import CategorySelection from "./CategorySelection";
import { useTasks } from "./TaskContext";

function TaskForm() {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const { add } = useTasks();

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
                    <CategorySelection selectedCategory={category} onSelectChange={setCategory}/>
                    <button className="action-btn" type="submit" disabled={!name}>✚</button>
                </fieldset>
            </form>
        </div>
    );
}

export default TaskForm;