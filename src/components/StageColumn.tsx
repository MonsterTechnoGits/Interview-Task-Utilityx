import { Trash2, Plus } from "lucide-react";
import type { Stage, Task, } from "../types";
import { AddTaskForm } from "./AddTaskForm";
import { TaskCard } from "./TaskCard";

export const StageColumn: React.FC<{
  stage: Stage;
  showAddTask: string | null;
  newTaskTitle: string;
  onTaskTitleChange: (title: string) => void;
  onAddTask: (stageId: string) => void;
  onCancelAddTask: () => void;
  onShowAddTask: (stageId: string) => void;
  onDeleteStage: (stageId: string) => void;
  onEditTask: (stageId: string, taskId: string) => void;
  onDeleteTask: (stageId: string, taskId: string) => void;
  onDragStart: (task: Task, stageId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (stageId: string) => void;
}> = ({
  stage,
  showAddTask,
  newTaskTitle,
  onTaskTitleChange,
  onAddTask,
  onCancelAddTask,
  onShowAddTask,
  onDeleteStage,
  onEditTask,
  onDeleteTask,
  onDragStart,
  onDragOver,
  onDrop
}) => {
  return (
    <div
      className="bg-gray-100 rounded-lg p-3 min-w-80 max-w-80"
      onDragOver={onDragOver}
      onDrop={() => onDrop(stage.id)}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800">{stage.title}</h2>
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded">
            {stage.tasks.length}
          </span>
          <button
            onClick={() => onDeleteStage(stage.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-3">
        {stage.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            stageId={stage.id}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onDragStart={onDragStart}
          />
        ))}
      </div>

      {showAddTask === stage.id ? (
        <AddTaskForm
          stageId={stage.id}
          newTaskTitle={newTaskTitle}
          onTitleChange={onTaskTitleChange}
          onAdd={onAddTask}
          onCancel={onCancelAddTask}
        />
      ) : (
        <button
          onClick={() => onShowAddTask(stage.id)}
          className="w-full text-left text-gray-600 hover:bg-gray-200 rounded-lg p-3 text-sm transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add a task...</span>
        </button>
      )}
    </div>
  );
};