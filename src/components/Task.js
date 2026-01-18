function Task( { task, onTaskUpdate } ) {
    return (
        <div>
            <p>{task.name}</p>
            <input 
                type="date"
                value={task.due}
                onChange={(e) => onTaskUpdate(task.id, { due: e.target.value })}
            />
            <select
                value={task.status}
                onChange={(e) => onTaskUpdate(task.id, { status: e.target.value })}
            >
                <option value="inactive">Not Started</option>
                <option value="active">In Progress</option>
                <option value="complete">Completed</option>
            </select>
        </div>
    );
}

export default Task;