import { Edit2, Trash2, Calendar } from "lucide-react";
import type { Task } from "../types";
import { UserAvatar } from "./UserAvatar";
import { sampleUsers } from "../data/sample-users";

export const TaskCard: React.FC<{
  task: Task;
  stageId: string;
  onEdit: (stageId: string, taskId: string) => void;
  onDelete: (stageId: string, taskId: string) => void;
  onDragStart: (task: Task, stageId: string) => void;
}> = ({ task, stageId, onEdit, onDelete, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(task, stageId)}
      className="bg-white rounded-lg p-3 shadow-sm cursor-move hover:shadow-md transition-shadow group"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-800 flex-1">{task.title}</h3>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(stageId, task.id)}
            className="text-gray-400 hover:text-blue-500"
          >
            <Edit2 className="w-3 h-3" />
          </button>
          <button
            onClick={() => onDelete(stageId, task.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>{task.createdAt.toLocaleDateString()}</span>
        </div>
        {task.assignedTo && <UserAvatar userId={sampleUsers.find(e=>task.assignedTo===e.id)} />}
      </div>
    </div>
  );
};