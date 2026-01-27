import '../App.css';
import { useState } from "react";
import { useTasks } from "./TaskContext";
import TaskForm from "./TaskForm";

function AddModal() {
    const { add } = useTasks();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");

    return (
        <div>
            {open ? (
                <TaskForm taskName={title} addTaskHandler={(newTask) => {
                    add(newTask); 
                    setOpen(false);
                    setTitle("");
                }}/>
                
            ) : (
                <div>
                    <input 
                        type="text"
                        placeholder="What would you like to work on today?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button onClick={() => setOpen(true)}>+</button>
                </div>
            )}
        </div>
    );
}

export default AddModal;