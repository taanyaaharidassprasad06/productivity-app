import { useRef } from "react";

function TaskForm( { addTaskHandler } ) {
    const nameRef = useRef(null);
    const dateRef = useRef(null);

    const submitHandler = (e) => {
        e.preventDefault();

        const newTask = {
            id: Date.now(),
            name: nameRef.current.value,
            due: dateRef.current.value,
            status: "inactive"
        }

        addTaskHandler(newTask);

        nameRef.current.value = "";
        dateRef.current.value = "";
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
                        ref={nameRef}
                    />
                    <label></label>
                    <input 
                        id="due" 
                        type="date"
                        ref={dateRef}
                    />
                </fieldset>
                <button type="submit">add task</button>
            </form>
        </div>
    );
}

export default TaskForm;