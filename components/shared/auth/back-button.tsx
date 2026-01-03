import Link from "next/link";

interface BackButtonProps {
  href: string;
  text: string;
  linkText: string;
}

export const BackButton = ({ href, text, linkText }: BackButtonProps) => {
  return (
    <div className="text-sm w-full flex justify-center items-center text-muted-foreground">
      {text}&nbsp;
      <Link href={href} target="_self" className="link underline">
        {linkText}
      </Link>
    </div>
  );
};
