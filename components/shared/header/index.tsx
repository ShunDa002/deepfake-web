import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import Menu from "./menu";
import Logo from "./logo";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
            <span className="hidden lg:block font-bold text-2xl">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
