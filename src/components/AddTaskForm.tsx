export const AddTaskForm: React.FC<{
  stageId: string;
  newTaskTitle: string;
  onTitleChange: (title: string) => void;
  onAdd: (stageId: string) => void;
  onCancel: () => void;
}> = ({ stageId, newTaskTitle, onTitleChange, onAdd, onCancel }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAdd(stageId);
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="bg-white rounded-lg p-3 shadow-sm mb-3">
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Enter task title..."
        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        autoFocus
        onKeyPress={handleKeyPress}
      />
      <div className="flex items-center space-x-2 mt-2">
        <button
          onClick={() => onAdd(stageId)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
        >
          Add Task
        </button>
        <button
          onClick={onCancel}
          className="text-gray-600 hover:text-gray-800 px-3 py-1 rounded-md text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};