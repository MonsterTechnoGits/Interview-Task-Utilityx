import { LogOut } from "lucide-react";
import type {  Board } from "../types";
import { UserAvatar } from "./UserAvatar";
import { useAppContext } from "../context/AppContext";
import { sampleUsers } from "../data/sample-users";
import { useNavigate } from "react-router-dom";

export const Header: React.FC<{
  title: string;
  board?: Board |  null;
}> = ({ title, board }) => {
  const { user ,onLogout} = useAppContext();
  const navigate = useNavigate();

    const onBackToDashboard = () => {
        navigate("/")
    };
  return (
    <div
      className={`${board ? "bg-blue-600" : "bg-white shadow-sm border-b"} px-4 py-${
        board ? "3" : "4"
      } flex items-center justify-between`}
    >
      <div className='flex items-center space-x-4'>
        {board && onBackToDashboard && (
          <button
            onClick={onBackToDashboard}
            className='text-white hover:text-blue-200 font-medium'
          >
            ← Back to Boards
          </button>
        )}
        <h1 className={`${board ? "text-white text-xl" : "text-2xl text-gray-800"} font-bold`}>
          {title}
        </h1>
      </div>
      <div className='flex items-center space-x-4'>
        {board && sampleUsers && (
          <div className='flex -space-x-1'>
            {board.members.map((memberId) => (
              <UserAvatar userId={sampleUsers.find(e=>e.id===memberId)} size='md' />
            ))}
          </div>
        )}
        <div className='flex items-center space-x-2'>
          <UserAvatar size='md' />
          <span className={`${board ? "text-white text-sm" : "font-medium"}`}>{user?.name}</span>
        </div>
        {!board && (
          <button
            onClick={onLogout}
            className='flex items-center space-x-1 text-gray-600 hover:text-gray-800'
          >
            <LogOut className='w-4 h-4' />
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
};
