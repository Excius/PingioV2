import { io, Socket } from "socket.io-client";
import { store } from "../redux/store";
import { setOnlineUsers } from "../redux/auth/authSlice";
import { clearMessages, setNewMessage } from "../redux/chat/chatSlice";

let socket: Socket | null = null;

export const connectSocket = async (userId: string) => {
  if (!userId || socket?.connected) return;

  socket = io(import.meta.env.VITE_SOCKET_URL || "/", {
    query: { userId },
  });
  await socket.connect();

  socket.on("getOnlineUsers", (onlineUsers: string[]) => {
    store.dispatch(setOnlineUsers(onlineUsers));
  });
};
export const disconnectSocket = async () => {
  if (!socket?.connected) return;
  socket.disconnect();
};

export const subscribeToMessages = () => {
  const selectedUser = store.getState().chat.selectedUser;
  if (!selectedUser || !socket?.connected) return;

  socket.on("newMessage", (newMessage) => {
    if (newMessage.senderId !== selectedUser._id) return;
    store.dispatch(setNewMessage(newMessage));
  });
};

export const unsubscribeFromMessages = () => {
  if (!socket?.connected) return;
  store.dispatch(clearMessages());

  socket.off("newMessage");
};
