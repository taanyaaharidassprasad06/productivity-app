import { useState } from "react";
import TaskForm from "./TaskForm";

function AddModal( { addTaskHandler } ) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");

    return (
        <div>
            {open ? (
                <TaskForm taskName={title} addTaskHandler={(newTask) => {
                    addTaskHandler(newTask); 
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