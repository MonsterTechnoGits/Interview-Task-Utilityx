import React from "react";
import { Header } from "../components/Header";
import { useAppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";

type Props = {
    children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
    const { currentBoard } = useAppContext();
    const location = useLocation();

    // Check if the route contains 'board'
    const isBoardRoute = location.pathname.includes("board");

    return (
        <div>
            <Header title="My Boards" board={isBoardRoute ? currentBoard : undefined} />
            {children}
        </div>
    );
}
