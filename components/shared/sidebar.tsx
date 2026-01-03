"use client";

import { useRouter } from "next/navigation";
import {
  SquarePen,
  MessageSquare,
  Menu,
  X,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatContext } from "./chatbot/chat-context";

const ChatSidebar = () => {
  const {
    sessions,
    activeSessionId,
    handleSelectSession,
    handleNewChat,
    handleDeleteSession,
    sidebarOpen,
    toggleSidebar,
  } = useChatContext();

  const router = useRouter();

  const onNewChatClick = () => {
    handleNewChat();
    router.push("/chat");
  };

  const onDetectorClick = () => {
    router.push("/image-detector");
  };

  const onDeleteClick = async (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation(); // Prevent selecting the session when clicking delete
    await handleDeleteSession(sessionId);
  };

  return (
    <>
      {/* Sidebar - Always visible, changes width when collapsed */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 flex h-full flex-col border-r border-border bg-secondary/95 backdrop-blur-sm transition-all duration-300 ease-in-out transform",
          sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64",
          sidebarOpen ? "lg:w-64" : "lg:w-14",
          "lg:translate-x-0"
        )}
      >
        {/* Top 2/3: navigation + history */}
        <div className="flex flex-col flex-[2] min-h-0">
          {/* Header with toggle button */}
          <div className="h-14 flex items-center px-2">
            <button
              onClick={toggleSidebar}
              className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-accent transition-colors"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* New Chat Button */}
          <div className="px-2">
            <button
              onClick={onNewChatClick}
              className={cn(
                "w-10 h-10 rounded-md text-sm transition-all duration-300 flex items-center hover:bg-accent hover:text-accent-foreground text-muted-foreground overflow-hidden",
                sidebarOpen ? "w-full px-3 gap-2" : "justify-center"
              )}
              title="New Chat"
            >
              <SquarePen className="w-4 h-4 shrink-0" />
              <span
                className={cn(
                  "whitespace-nowrap transition-opacity duration-300",
                  sidebarOpen ? "opacity-100" : "opacity-0 w-0"
                )}
              >
                New Chat
              </span>
            </button>
          </div>

          {/* Chat History */}
          <div
            className={cn(
              "flex-1 overflow-y-auto px-2 transition-opacity duration-300",
              sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <div className="space-y-1">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={cn(
                    "group w-full h-10 text-left px-3 rounded-md text-sm transition-all duration-300 flex items-center gap-2 overflow-hidden cursor-pointer",
                    "hover:bg-accent hover:text-accent-foreground",
                    activeSessionId === session.id
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                  onClick={() => handleSelectSession(session.id)}
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span
                    className={cn(
                      "flex-1 truncate whitespace-nowrap transition-opacity duration-300",
                      sidebarOpen ? "opacity-100" : "opacity-0 w-0"
                    )}
                  >
                    {session.title}
                  </span>
                  {/* Delete button - only visible on hover */}
                  <button
                    onClick={(e) => onDeleteClick(e, session.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/20 hover:text-destructive transition-all shrink-0"
                    title="Delete chat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom 1/3: detector quick access */}
        <div className="flex flex-col flex-[1] border-t border-border p-3">
          <button
            onClick={onDetectorClick}
            className={cn(
              "w-10 h-10 rounded-md text-sm transition-all duration-300 flex items-center hover:bg-accent hover:text-accent-foreground text-muted-foreground overflow-hidden",
              sidebarOpen
                ? "w-full px-3 gap-2 justify-start"
                : "justify-center mx-auto"
            )}
            title="Image Detector"
          >
            <ImageIcon className="w-4 h-4 shrink-0" />
            <span
              className={cn(
                "whitespace-nowrap transition-opacity duration-300",
                sidebarOpen ? "opacity-100" : "opacity-0 w-0"
              )}
            >
              Image Detector
            </span>
          </button>
        </div>
      </aside>

      {/* Overlay when sidebar is open (for mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default ChatSidebar;
