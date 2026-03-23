import { createBrowserRouter, Navigate } from "react-router-dom";
import { AdminLayout } from "../components/layout/AdminLayout";
import { ProtectedRoute } from "../components/layout/ProtectedRoute";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { EventFormPage } from "../pages/events/EventFormPage";
import { EventsListPage } from "../pages/events/EventsListPage";
import { UserFormPage } from "../pages/users/UserFormPage";
import { UsersListPage } from "../pages/users/UsersListPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: "dashboard", element: <DashboardPage /> },
          { path: "eventos", element: <EventsListPage /> },
          { path: "eventos/novo", element: <EventFormPage /> },
          { path: "eventos/:id/editar", element: <EventFormPage /> },
          { path: "usuarios", element: <UsersListPage /> },
          { path: "usuarios/novo", element: <UserFormPage /> },
          { path: "usuarios/:id/editar", element: <UserFormPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
