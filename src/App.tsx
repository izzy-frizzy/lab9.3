import { useState } from "react";

import type { Task, TaskStatus } from "../src/types";

import TaskFilter from "../src/components/TaskFilter/TaskFilter";
import TaskList from "../src/components/TaskList/TaskList";

import "./App.css";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Finish project",
    description: "Complete the React assignment.",
    status: "pending",
    priority: "high",
    dueDate: "2026-10-28",
  },
  {
    id: "2",
    title: "Study TypeScript",
    description: "Practice interfaces and types.",
    status: "in-progress",
    priority: "medium",
    dueDate: "2026-10-27",
  },
  {
    id: "3",
    title: "Review notes",
    description: "Review the completed lessons.",
    status: "completed",
    priority: "low",
    dueDate: "2026-10-24",
  },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [filters, setFilters] = useState<{
    status?: TaskStatus;
    priority?: "low" | "medium" | "high";
  }>({});

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  const handleDelete = (taskId: string) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId),
    );
  };

  const handleFilterChange = (newFilters: {
    status?: TaskStatus;
    priority?: "low" | "medium" | "high";
  }) => {
    setFilters((previousFilters) => ({
      ...previousFilters,
      ...newFilters,
    }));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = !filters.status || task.status === filters.status;

    const matchesPriority =
      !filters.priority || task.priority === filters.priority;

    return matchesStatus && matchesPriority;
  });

  return (
    <main className="app">
      <h1>Task Manager</h1>

      <p>
        Tasks remaining:{" "}
        {tasks.filter((task) => task.status !== "completed").length}
      </p>

      <TaskFilter onFilterChange={handleFilterChange} />

      <TaskList
        tasks={filteredTasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </main>
  );
}
