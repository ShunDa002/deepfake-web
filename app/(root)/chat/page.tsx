"use client";

import { ChatWindow } from "@/components/shared/chatbot";
import { useChatContext } from "@/components/shared/chatbot/chat-context";

const ChatPage = () => {
  const { activeSession, handleSendMessage, isLoading } = useChatContext();

  return (
    <div className="h-full">
      <ChatWindow
        messages={activeSession?.messages || []}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatPage;
