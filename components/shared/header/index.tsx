import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import Menu from "./menu";
import Logo from "./logo";
import MainNav from "./main-nav";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="hidden lg:block font-bold text-lg">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <MainNav />
        <Menu />
      </div>
    </header>
  );
};

export default Header;
