import '../App.css';
import { useState } from "react";
import CategorySelection from "./CategorySelection";
import { useTasks } from "./TaskContext";

function TaskForm( { /*taskName, addTaskHandler*/ } ) {
    const [name, setName] = useState(/*taskName*/ "");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    // new line:
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

        /*addTaskHandler(newTask);*/
        add(newTask);

        setName("");
        setDate("");
        setCategory("");
    }

    return (
        <div className="form-container">
            <form className="add-todo" onSubmit={submitHandler}>
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
                <button type="submit" disabled={!name}>Add</button>
            </form>
        </div>
    );
}

export default TaskForm;