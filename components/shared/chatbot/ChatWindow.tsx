"use client";

import { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Message } from "./types";

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => void | Promise<void>;
  isLoading?: boolean;
}

const ChatWindow = ({
  messages,
  onSendMessage,
  isLoading = false,
}: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Create a placeholder loading message
  const loadingMessage: Message = {
    id: "loading",
    content: "",
    sender: "app",
    timestamp: new Date(),
  };

  return (
    <div className="relative flex-1 flex flex-col bg-background h-full min-h-0">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto min-h-0 pb-28">
        {messages.length === 0 && !isLoading ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            <MessageSquare className="w-12 h-12 mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-1">Start a conversation</h3>
            <p className="text-sm">Ask me anything about deepfake detection!</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto py-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {/* Show loading message when waiting for response */}
            {isLoading && (
              <ChatMessage message={loadingMessage} isLoading={true} />
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area (floats over messages) */}
      <div className="fixed inset-x-0 bottom-0 z-20 bg-background/95 backdrop-blur border-t border-border">
        <ChatInput onSendMessage={onSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default ChatWindow;
