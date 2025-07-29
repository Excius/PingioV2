import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../redux/store";
import { setSelectedUser } from "../redux/chat/chatSlice";

const ChatHeader = () => {
  const selectedUser = useSelector(
    (state: RootState) => state.chat.selectedUser
  );
  const onlineUsers = useSelector((state: RootState) => state.chat.onlineUsers);
  const dispatch = useAppDispatch();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.some((u) => u._id === selectedUser._id)
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() =>
            dispatch(
              setSelectedUser({
                _id: "",
                fullName: "",
                profilePic: "",
                email: "",
                createdAt: "",
                updatedAt: "",
              })
            )
          }
        >
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
