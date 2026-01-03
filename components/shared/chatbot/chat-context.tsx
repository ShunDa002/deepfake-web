"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ChatSession, Message } from "./types";
import { sendChatMessage } from "@/lib/actions/chat.actions";
import {
  getUserSessions,
  createSession,
  deleteSession as deleteSessionAction,
  checkAuthStatus,
} from "@/lib/actions/session.actions";

interface ChatContextType {
  sessions: ChatSession[];
  activeSessionId: string | null;
  activeSession: ChatSession | undefined;
  sidebarOpen: boolean;
  isLoading: boolean;
  isLoadingSessions: boolean;
  isLoggedIn: boolean;
  toggleSidebar: () => void;
  handleNewChat: () => Promise<void>;
  handleSelectSession: (sessionId: string) => void;
  handleDeleteSession: (sessionId: string) => Promise<void>;
  handleSendMessage: (content: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  // Load sessions from database on mount (or create guest session)
  useEffect(() => {
    const loadSessions = async () => {
      setIsLoadingSessions(true);

      // Check if user is logged in
      const authResult = await checkAuthStatus();
      const loggedIn = authResult.isLoggedIn;
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        // Load sessions from database for logged-in users
        const result = await getUserSessions();
        if (result.success && result.data) {
          interface DbMessage {
            id: string;
            content: string;
            sender: string;
            createdAt: Date;
          }
          interface DbSession {
            id: string;
            title: string;
            messages: DbMessage[];
            createdAt: Date;
            updatedAt: Date;
          }
          const transformedSessions: ChatSession[] = (
            result.data as DbSession[]
          ).map((session) => ({
            id: session.id,
            title: session.title,
            messages: session.messages.map((msg) => ({
              id: msg.id,
              content: msg.content,
              sender: msg.sender as "user" | "app",
              timestamp: new Date(msg.createdAt),
            })),
            createdAt: new Date(session.createdAt),
            updatedAt: new Date(session.updatedAt),
          }));
          setSessions(transformedSessions);
          if (transformedSessions.length > 0) {
            setActiveSessionId(transformedSessions[0].id);
          }
        }
      } else {
        // Create a local guest session for non-logged-in users
        const guestSession: ChatSession = {
          id: crypto.randomUUID(),
          title: "Guest Conversation",
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setSessions([guestSession]);
        setActiveSessionId(guestSession.id);
      }

      setIsLoadingSessions(false);
    };

    loadSessions();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleNewChat = async () => {
    if (isLoggedIn) {
      // For logged-in users, check if there's already an empty session
      const existingEmptySession = sessions.find(
        (s) => s.messages.length === 0
      );

      if (existingEmptySession) {
        setActiveSessionId(existingEmptySession.id);
        return;
      }

      // Create session in database for logged-in users
      const result = await createSession();
      if (result.success && result.data) {
        const newSession: ChatSession = {
          id: result.data.id,
          title: result.data.title,
          messages: [],
          createdAt: new Date(result.data.createdAt),
          updatedAt: new Date(result.data.updatedAt),
        };
        setSessions([newSession, ...sessions]);
        setActiveSessionId(newSession.id);
      }
    } else {
      // For guests: clear current session and create a fresh one
      const newGuestSession: ChatSession = {
        id: crypto.randomUUID(),
        title: "Guest Conversation",
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      // Replace all sessions with just the new one (clears cache)
      setSessions([newGuestSession]);
      setActiveSessionId(newGuestSession.id);
    }
  };

  const handleSelectSession = (sessionId: string) => {
    setActiveSessionId(sessionId);
  };

  const handleDeleteSession = async (sessionId: string) => {
    if (isLoggedIn) {
      // Delete from database for logged-in users
      const result = await deleteSessionAction(sessionId);
      if (result.success) {
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
        if (activeSessionId === sessionId) {
          const remaining = sessions.filter((s) => s.id !== sessionId);
          setActiveSessionId(remaining[0]?.id || null);
        }
      }
    } else {
      // Just remove from local state for guests
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      if (activeSessionId === sessionId) {
        const remaining = sessions.filter((s) => s.id !== sessionId);
        setActiveSessionId(remaining[0]?.id || null);
      }
    }
  };

  const handleSendMessage = async (content: string) => {
    let currentSessionId = activeSessionId;

    // Auto-create a session if none exists
    if (!currentSessionId) {
      if (isLoggedIn) {
        const result = await createSession();
        if (result.success && result.data) {
          const newSession: ChatSession = {
            id: result.data.id,
            title: "New Conversation",
            messages: [],
            createdAt: new Date(result.data.createdAt),
            updatedAt: new Date(result.data.updatedAt),
          };
          setSessions([newSession]);
          setActiveSessionId(newSession.id);
          currentSessionId = newSession.id;
        } else {
          console.error("Failed to create session:", result.error);
          return;
        }
      } else {
        // Create local session for guest
        const guestSession: ChatSession = {
          id: crypto.randomUUID(),
          title: "Guest Conversation",
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setSessions([guestSession]);
        setActiveSessionId(guestSession.id);
        currentSessionId = guestSession.id;
      }
    }

    // Add user message immediately for instant feedback
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setSessions((prev) =>
      prev.map((session) => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            messages: [...session.messages, userMessage],
            title:
              session.messages.length === 0
                ? content.slice(0, 30) + (content.length > 30 ? "..." : "")
                : session.title,
            updatedAt: new Date(),
          };
        }
        return session;
      })
    );

    // Call API (which also saves to database for logged-in users)
    setIsLoading(true);
    try {
      const result = await sendChatMessage(content, currentSessionId);

      const appMessage: Message = {
        id: crypto.randomUUID(),
        content: result.success
          ? result.data?.response.content || "No response received"
          : `Error: ${result.error}`,
        sender: "app",
        timestamp: new Date(),
      };

      setSessions((prev) =>
        prev.map((session) => {
          if (session.id === currentSessionId) {
            return {
              ...session,
              messages: [...session.messages, appMessage],
              updatedAt: new Date(),
            };
          }
          return session;
        })
      );
    } catch (error) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: "Sorry, something went wrong. Please try again.",
        sender: "app",
        timestamp: new Date(),
      };

      setSessions((prev) =>
        prev.map((session) => {
          if (session.id === currentSessionId) {
            return {
              ...session,
              messages: [...session.messages, errorMessage],
              updatedAt: new Date(),
            };
          }
          return session;
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        sessions,
        activeSessionId,
        activeSession,
        sidebarOpen,
        isLoading,
        isLoadingSessions,
        isLoggedIn,
        toggleSidebar,
        handleNewChat,
        handleSelectSession,
        handleDeleteSession,
        handleSendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
