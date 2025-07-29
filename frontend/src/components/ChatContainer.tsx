import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../redux/store";
import { useEffect, useRef } from "react";
import { getMessages } from "../redux/chat/chatThunks";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { formatMessageTime } from "../lib/utils";
import { subscribeToMessages, unsubscribeFromMessages } from "../lib/socket";

function ChatContainer() {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const isMessagesLoading = useSelector(
    (state: RootState) => state.chat.isMessagesLoading
  );
  const selectedUser = useSelector(
    (state: RootState) => state.chat.selectedUser
  );
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const dispatch = useAppDispatch();

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getMessages(selectedUser._id));

    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser, dispatch]);

  useEffect(() => {
    if (messageEndRef.current && messages)
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (authUser === null) return;

  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto ">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          authUser?.fullName || "User"
                        )}&background=6366f1&color=fff&size=200`
                      : selectedUser.profilePic ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          authUser?.fullName || "User"
                        )}&background=6366f1&color=fff&size=200`
                  }
                  alt="Profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1 ">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
