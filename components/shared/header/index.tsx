"use client";

import Link from "next/link";
import { Menu as MenuIcon } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import Menu from "./menu";
import Logo from "./logo";
import MainNav from "./main-nav";
import { useChatContext } from "../chatbot/chat-context";

const Header = () => {
  const { toggleSidebar } = useChatContext();

  return (
    <header className="w-full border-b">
      <div className="grid grid-cols-3 items-center gap-3 px-4 py-2 lg:flex lg:items-center lg:justify-between lg:gap-6">
        <div className="flex items-center justify-start">
          <button
            onClick={toggleSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent lg:hidden"
            aria-label="Open sidebar"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center justify-center lg:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="hidden lg:block font-bold text-lg">
              {APP_NAME}
            </span>
          </Link>
        </div>

        <MainNav className="hidden flex-1 justify-center lg:flex lg:items-center lg:gap-6" />

        <div className="flex items-center justify-end">
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
