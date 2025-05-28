import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { Board, User } from "../types";
import { sampleBoards } from "../data/sample-boards";

interface AppContextProps {
  user: User | undefined;
  setUser: (user: User) => void;
  boards: Board[];
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
  currentBoard: Board | null;
  setCurrentBoard: React.Dispatch<React.SetStateAction<Board | null>>;
  onLogout: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [boards, setBoards] = useState<Board[]>([]);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const navigate = useNavigate();

  const onLogout = () => {
    setUser(undefined);
    setCurrentBoard(null);
    navigate("/login");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user && !currentBoard) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    setBoards(sampleBoards);
  }, []);

  return (
    <AppContext.Provider
      value={{ user, setUser, boards, setBoards, currentBoard, setCurrentBoard, onLogout }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
