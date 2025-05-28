import { Trash2, Users } from "lucide-react";
import type { Board } from "../types";
import { UserAvatar } from "./UserAvatar";
import { sampleUsers } from "../data/sample-users";

export const BoardCard: React.FC<{
  board: Board;
  onOpen: (board: Board) => void;
  onDelete: (boardId: string) => void;
}> = ({ board, onOpen, onDelete }) => {
  return (
    <div className='bg-white rounded-lg shadow hover:shadow-md transition-shadow'>
      <div className='p-6'>
        <div className='flex items-start justify-between mb-4'>
          <h3 className='font-semibold text-lg text-gray-800 truncate'>{board.title}</h3>
          <button
            onClick={() => onDelete(board.id)}
            className='text-gray-400 hover:text-red-500 transition-colors'
          >
            <Trash2 className='w-4 h-4' />
          </button>
        </div>

        {board.description && (
          <p className='text-gray-600 text-sm mb-4 line-clamp-2'>{board.description}</p>
        )}

        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Users className='w-4 h-4 text-gray-400' />
            <div className='flex -space-x-1'>
              {board.members.slice(0, 3).map((member) => (
                <UserAvatar key={member} userId={sampleUsers.find(e=>member===e.id)} />
              ))}
              {board.members.length > 3 && (
                <div className='w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs text-gray-600'>
                  +{board.members.length - 3}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => onOpen(board)}
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors'
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
};
