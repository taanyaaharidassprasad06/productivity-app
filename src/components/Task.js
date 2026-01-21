function Task( { task, onTaskUpdate } ) {
    return (
        <div>
            <p>{task.name}</p>
            <p>{task.due}</p>
            <p>{task.category}</p>
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