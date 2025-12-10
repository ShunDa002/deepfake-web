"use client";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Logo = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Image
      src={
        theme === "light" ? "/images/logo-light.svg" : "/images/logo-dark.svg"
      }
      alt={`${APP_NAME} logo`}
      width={60}
      height={60}
      priority={true}
    />
  );
};

export default Logo;
