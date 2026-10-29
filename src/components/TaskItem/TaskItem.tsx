import type { TaskItemProps, TaskStatus } from "../../types";

export default function TaskItem({
  task,
  onStatusChange,
  onDelete,
}: TaskItemProps) {
  const isOverdue =
    task.dueDate !== "" &&
    new Date(task.dueDate).getTime() < new Date().setHours(0, 0, 0, 0) &&
    task.status !== "completed";

  return (
    <article className={`task-item ${task.status}`}>
      <div className="task-details">
        <h3>{task.title}</h3>

        <p>{task.description}</p>

        <p>
          Priority: <strong>{task.priority}</strong>
        </p>

        <p>Due date: {task.dueDate || "No due date"}</p>

        {isOverdue && <p className="overdue">This task is overdue!</p>}

        {task.status === "completed" && (
          <p className="completed-message">Task completed!</p>
        )}
      </div>

      <div className="task-actions">
        <label htmlFor={`status-${task.id}`}>Status:</label>

        <select
          id={`status-${task.id}`}
          value={task.status}
          onChange={(event) =>
            onStatusChange(task.id, event.target.value as TaskStatus)
          }
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
