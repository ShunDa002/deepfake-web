"use client";

import ChatSidebar from "@/components/shared/sidebar";
import {
  ChatProvider,
  useChatContext,
} from "@/components/shared/chatbot/chat-context";
import { cn } from "@/lib/utils";

function ClientLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useChatContext();

  return (
    <>
      <ChatSidebar />
      <div
        className={cn(
          "flex-1 flex flex-col min-h-0 transition-all duration-300 ease-in-out",
          sidebarOpen ? "lg:ml-64" : "lg:ml-14"
        )}
      >
        {children}
      </div>
    </>
  );
}

export function ChatLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ChatProvider>
      <ClientLayout>{children}</ClientLayout>
    </ChatProvider>
  );
}
