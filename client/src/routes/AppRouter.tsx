import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import BooksPage from "../pages/BooksPage";
import BookDetailsPage from "../pages/BookDetailsPage";
import CurrentBorrowsPage from "../pages/CurrentBorrowsPage";
import BorrowHistoryPage from "../pages/BorrowHistoryPage";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "../guards/ProtectedRoute";
import PublicRoute from "../guards/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "books",
        element: <BooksPage />,
      },
      {
        path: "books/:id",
        element: <BookDetailsPage />,
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "my-borrows",
            element: <CurrentBorrowsPage />,
          },
          {
            path: "borrow-history",
            element: <BorrowHistoryPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);

export default router;