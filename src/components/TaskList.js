import { useTasks } from "./TaskContext";
import Task from "./Task";
import AddModal from "./AddModal";

function TaskList() {
    const { todos } = useTasks();

    return (
        <div>
            <AddModal/>

            {todos.map(todo => (
                <Task key={todo.id} task={todo}/>
            ))}
        </div>
    );

}

export default TaskList;