import { Plus } from "lucide-react";

export const CreateBoardCard: React.FC<{
  onCreate: () => void;
}> = ({ onCreate }) => {
  return (
    <button
      onClick={onCreate}
      className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-center"
    >
      <Plus className="w-12 h-12 text-gray-400 mx-auto mb-2" />
      <span className="text-gray-600 font-medium">Create New Board</span>
    </button>
  );
};