import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { DashboardView } from "../pages/DashboardView";
import { LoginView } from "../pages/LoginView";
import { BoardView } from "../pages/BoardView";
import AppLayout from "../layout/AppLayout";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <AppLayout>
          <Outlet />
        </AppLayout>
      ),
      children: [
        { path: "", element: <DashboardView /> },
        { path: "board/:id", element: <BoardView /> },
        { path: "test", element: <div>Test</div> },
      ],
    },

    { path: "/login", element: <LoginView /> },
    { path: "*", element: <Navigate to='/404' replace /> }, // <- this should be LAST
  ]);
}
