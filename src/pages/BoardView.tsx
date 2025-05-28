import { Plus } from "lucide-react";
import type { Task, Stage } from "../types";
import { StageColumn } from "../components/StageColumn";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

export const BoardView: React.FC<{}> = () => {
  const { user, setBoards, currentBoard, setCurrentBoard } = useAppContext();
  const [draggedTask, setDraggedTask] = useState<{ task: Task; sourceStageId: string } | null>(
    null
  );
  const [showAddTask, setShowAddTask] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onAddStage = () => {
    if (!currentBoard) return;
    const title = prompt("Enter stage title:");
    if (!title) return;

    const newStage: Stage = {
      id: "stage-" + Date.now(),
      title,
      order: currentBoard.stages.length + 1,
      tasks: [],
    };

    const updatedBoard = {
      ...currentBoard,
      stages: [...currentBoard.stages, newStage],
    };

    setCurrentBoard(updatedBoard);
    setBoards((prev) => prev.map((b) => (b.id === currentBoard.id ? updatedBoard : b)));
  };

  const onDeleteStage = (stageId: string) => {
    if (!currentBoard) return;
    if (confirm("Are you sure? All tasks in this stage will be deleted.")) {
      const updatedBoard = {
        ...currentBoard,
        stages: currentBoard.stages.filter((s) => s.id !== stageId),
      };
      setCurrentBoard(updatedBoard);
      setBoards((prev) => prev.map((b) => (b.id === currentBoard.id ? updatedBoard : b)));
    }
  };

  // Task management handlers
  const handleAddTask = (stageId: string) => {
    if (!currentBoard || !newTaskTitle.trim()) return;

    const newTask: Task = {
      id: "task-" + Date.now(),
      title: newTaskTitle.trim(),
      createdAt: new Date(),
      assignedTo: user?.id,
    };

    const updatedBoard = {
      ...currentBoard,
      stages: currentBoard.stages.map((stage) =>
        stage.id === stageId ? { ...stage, tasks: [...stage.tasks, newTask] } : stage
      ),
    };

    setCurrentBoard(updatedBoard);
    setBoards((prev) => prev.map((b) => (b.id === currentBoard.id ? updatedBoard : b)));
    setNewTaskTitle("");
    setShowAddTask(null);
  };

  const onCancelAddTask = () => {
    setShowAddTask(null);
    setNewTaskTitle("");
  };

  const handleDeleteTask = (stageId: string, taskId: string) => {
    if (!currentBoard) return;

    const updatedBoard = {
      ...currentBoard,
      stages: currentBoard.stages.map((stage) =>
        stage.id === stageId
          ? { ...stage, tasks: stage.tasks.filter((t) => t.id !== taskId) }
          : stage
      ),
    };

    setCurrentBoard(updatedBoard);
    setBoards((prev) => prev.map((b) => (b.id === currentBoard.id ? updatedBoard : b)));
  };

  const onEditTask = (stageId: string, taskId: string) => {
    if (!currentBoard) return;
    const task = currentBoard.stages
      .find((s) => s.id === stageId)
      ?.tasks.find((t) => t.id === taskId);
    if (!task) return;

    const newTitle = prompt("Edit task title:", task.title);
    if (!newTitle) return;

    const updatedBoard = {
      ...currentBoard,
      stages: currentBoard.stages.map((stage) =>
        stage.id === stageId
          ? {
              ...stage,
              tasks: stage.tasks.map((t) => (t.id === taskId ? { ...t, title: newTitle } : t)),
            }
          : stage
      ),
    };

    setCurrentBoard(updatedBoard);
    setBoards((prev) => prev.map((b) => (b.id === currentBoard.id ? updatedBoard : b)));
  };

  // Drag and drop handlers
  const onDragStart = (task: Task, sourceStageId: string) => {
    setDraggedTask({ task, sourceStageId });
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (targetStageId: string) => {
    if (!draggedTask || !currentBoard) return;

    const { task, sourceStageId } = draggedTask;

    let updatedStages = [...currentBoard.stages];

    // Remove task from source stage
    updatedStages = updatedStages.map((stage) =>
      stage.id === sourceStageId
        ? { ...stage, tasks: stage.tasks.filter((t) => t.id !== task.id) }
        : stage
    );

    // Add task to target stage
    updatedStages = updatedStages.map((stage) => {
      if (stage.id === targetStageId) {
        return { ...stage, tasks: [...stage.tasks, task] };
      }
      return stage;
    });

    const updatedBoard = { ...currentBoard, stages: updatedStages };
    setCurrentBoard(updatedBoard);
    setBoards((prev) => prev.map((b) => (b.id === currentBoard.id ? updatedBoard : b)));
    setDraggedTask(null);
  };

  console.log("Current Board:", currentBoard);
  return (
    <div className='min-h-screen bg-blue-500'>
      <div className='p-4'>
        <div className='flex space-x-4 overflow-x-auto'>
          {currentBoard?.stages.map((stage) => (
            <StageColumn
              key={stage.id}
              stage={stage}
              showAddTask={showAddTask}
              newTaskTitle={newTaskTitle}
              onTaskTitleChange={setNewTaskTitle}
              onAddTask={handleAddTask}
              onCancelAddTask={onCancelAddTask}
              onShowAddTask={setShowAddTask}
              onDeleteStage={onDeleteStage}
              onEditTask={onEditTask}
              onDeleteTask={handleDeleteTask}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
            />
          ))}

          <button
            onClick={onAddStage}
            className='bg-gray-200 hover:bg-gray-300 rounded-lg p-3 min-w-80 max-w-80 flex items-center justify-center space-x-2 text-gray-600 transition-colors'
          >
            <Plus className='w-4 h-4' />
            <span>Add Stage</span>
          </button>
        </div>
      </div>
    </div>
  );
};
