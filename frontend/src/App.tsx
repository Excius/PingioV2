import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { useAuthCheckQuery } from "./redux/services/authApi";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const SettingsPage = React.lazy(() => import("./pages/SettingsPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));

function App() {
  const { data, isLoading } = useAuthCheckQuery({});

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={data ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!data ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!data ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/settings"
          element={data ? <SettingsPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/profile"
          element={data ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
