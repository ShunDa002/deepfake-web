"use client";

import ModeToggle from "./mode-toggle";
import { EllipsisVertical } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import UserButton from "./user-button";
import { useSession } from "next-auth/react";

const Menu = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session?.user;

  return (
    <div className="flex items-center justify-end gap-3">
      <nav className="hidden items-center gap-2 lg:flex">
        <ModeToggle />
        <UserButton />
      </nav>
      <nav className="flex items-center lg:hidden">
        {isAuthenticated ? (
          <UserButton />
        ) : (
          <Sheet>
            <SheetTrigger className="align-middle">
              <EllipsisVertical />
            </SheetTrigger>
            <SheetContent className="flex flex-col items-start">
              <SheetTitle>Menu</SheetTitle>
              <ModeToggle />
              <UserButton />
              <SheetDescription></SheetDescription>
            </SheetContent>
          </Sheet>
        )}
      </nav>
    </div>
  );
};

export default Menu;
