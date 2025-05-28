
import { BoardCard } from "../components/BoardCard";
import { CreateBoardCard } from "../components/CreateBoardCard";
import { useAppContext } from "../context/AppContext";
import type { Board } from "../types";
import { useNavigate } from "react-router-dom";

export const DashboardView = () => {
  const { user, boards, setBoards, currentBoard, setCurrentBoard } = useAppContext();
  const navigate = useNavigate();

  const userBoards = user?.id ? boards?.filter((b) => b.members.includes(user.id)) : [];

  const handleCreateBoard = () => {
    const title = prompt("Enter board title:");
    if (!title || !user) return;

    const newBoard: Board = {
      id: Date.now().toString(),
      title,
      description: "",
      createdBy: user.id,
      createdAt: new Date(),
      members: [user.id],
      stages: [
        { id: "todo-" + Date.now(), title: "To Do", order: 1, tasks: [] },
        { id: "doing-" + Date.now(), title: "In Progress", order: 2, tasks: [] },
        { id: "done-" + Date.now(), title: "Done", order: 3, tasks: [] },
      ],
    };

    setBoards((prev) => [...prev, newBoard]);
  };

  const handleOpenBoard = (board: Board) => {
    setCurrentBoard(board);
    navigate("/board/" + board.id);
  };

  const handleDeleteBoard = (boardId: string) => {
    if (confirm("Are you sure you want to delete this board?")) {
      setBoards((prev) => prev.filter((b) => b.id !== boardId));
      if (currentBoard?.id === boardId) {
        setCurrentBoard(null);
        navigate("/");
      }
    }
  };
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          <CreateBoardCard onCreate={handleCreateBoard} />
          {userBoards?.map((board) => (
            <BoardCard
              key={board.id}
              board={board}
              onOpen={handleOpenBoard}
              onDelete={handleDeleteBoard}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
