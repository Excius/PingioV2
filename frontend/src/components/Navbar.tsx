import { Link, useNavigate } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useSelector } from "react-redux";
import { memo } from "react";
import { useAppDispatch, type RootState } from "../redux/store";
import { checkAuth, logout } from "../redux/auth/authThunks";

const Navbar = memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  return (
    <header
      className="border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80 shadow-sm"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Pingio</h1>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {authUser && (
              <>
                <span className="text-sm font-medium text-base-content/70 hidden md:inline">
                  Hello, {authUser.fullName}
                </span>

                <div className="h-6 w-px bg-base-300 hidden md:block"></div>

                <Link
                  to={"/profile"}
                  className="btn btn-sm btn-ghost gap-2 hover:bg-base-200 transition-colors"
                >
                  <User className="size-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <Link
                  to={"/settings"}
                  className="btn btn-sm btn-ghost gap-2 hover:bg-base-200 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </Link>

                <button
                  className="btn btn-sm btn-ghost gap-2 hover:bg-base-200 transition-colors text-error hover:text-error"
                  onClick={async () => {
                    await dispatch(logout());
                    await dispatch(checkAuth());
                    navigate("/");
                  }}
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
});

export default Navbar;
