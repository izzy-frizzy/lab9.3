
import type { TaskFilterProps } from '../../types';
import type { TaskStatus } from '../../types';

export default function TaskFilter({
  onFilterChange,
}: TaskFilterProps) {
  const handleStatusChange = (
    value: string
  ) => {
    onFilterChange({
      status: value
        ? (value as TaskStatus)
        : undefined,
    });
  };

  const handlePriorityChange = (
    value: string
  ) => {
    onFilterChange({
      priority: value
        ? (value as 'low' | 'medium' | 'high')
        : undefined,
    });
  };

  return (
    <div className="task-filters">
      <label htmlFor="status-filter">
        Filter by status:
      </label>

      <select
        id="status-filter"
        defaultValue=""
        onChange={(event) =>
          handleStatusChange(event.target.value)
        }
      >
        <option value="">All statuses</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <label htmlFor="priority-filter">
        Filter by priority:
      </label>

      <select
        id="priority-filter"
        defaultValue=""
        onChange={(event) =>
          handlePriorityChange(event.target.value)
        }
      >
        <option value="">All priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}
