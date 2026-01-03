import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { ChatLayoutWrapper } from "@/components/shared/chatbot/chat-layout-wrapper";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <div className="flex h-screen">
      <SessionProvider session={session}>
        <ChatLayoutWrapper>
          <Header />
          <main className="flex-1 overflow-auto">{children}</main>
          {/* {!session && <Footer />} */}
        </ChatLayoutWrapper>
      </SessionProvider>
    </div>
  );
}
