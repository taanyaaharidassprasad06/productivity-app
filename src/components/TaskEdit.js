import '../App.css';
import { useState } from "react";
import CategorySelection from "./CategorySelection";

function TaskEdit( { task, onSave } ) {
    const [name, setName] = useState(task.name);
    const [date, setDate] = useState(task.due);
    const [category, setCategory] = useState(task.category);

    // User clicks "Done" button in TaskEdit --> collect updated values --> pass them back to Task --> Task updates task in TaskContext
    const handleSave = () => {
        const updates = { name, due: date, category };
        onSave(updates);
    }


    return (
        <div>
            <form>
                <fieldset>
                    <label htmlFor="name">ToDo: </label>
                    <input 
                        id="name"
                        type="text"
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

                    <button type="submit" onClick={handleSave}>Done</button>
                </fieldset>
            </form>
        </div>
    );
}

export default TaskEdit;