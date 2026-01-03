"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { UserIcon } from "lucide-react";

const UserButton = () => {
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated" && !!session?.user;

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-1">
        <Button asChild size="sm">
          <Link href="/login">
            <UserIcon />
            Log in
          </Link>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link href="/sign-up">Sign up for free</Link>
        </Button>
      </div>
    );
  }

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-200"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-medium leading-none">
                {session.user?.name}
              </div>
              <div className="text-sm text-muted-foreground leading-none">
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem className="p-0 mb-1">
            <button
              className="w-full text-left px-2 py-2 text-sm hover:bg-accent"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
