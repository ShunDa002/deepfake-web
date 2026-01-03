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

  // Ensure mobile view uses the real viewport height to avoid browser UI overlays
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();
    window.addEventListener("resize", setVh);
    window.addEventListener("orientationchange", setVh);
    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
    };
  }, []);

  // Create a placeholder loading message
  const loadingMessage: Message = {
    id: "loading",
    content: "",
    sender: "app",
    timestamp: new Date(),
  };

  return (
    <div className="flex-1 flex flex-col bg-background h-[calc(var(--vh,1vh)*100)] md:h-full min-h-0">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto min-h-0">
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

      {/* Input Area */}
      <div className="sticky bottom-0 bg-background">
        <ChatInput onSendMessage={onSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default ChatWindow;
