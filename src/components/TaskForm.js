import { useState } from "react";
import CategorySelection from "./CategorySelection";

function TaskForm( { addTaskHandler } ) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();

        const newTask = {
            id: Date.now(),
            name,
            due: date,
            category,
            status: "inactive"
        }

        addTaskHandler(newTask);

        setName("");
        setDate("");
        setCategory("");
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <fieldset>
                    <label htmlFor="name">ToDo: </label>
                    <input 
                        id="name" 
                        type="text" 
                        placeholder="enter task name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>Due Date: </label>
                    <input 
                        id="due" 
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <CategorySelection selectedCategory={category} onSelectChange={setCategory}/>
                </fieldset>
                <button type="submit" disabled={!name}>add task</button>
            </form>
        </div>
    );
}

export default TaskForm;