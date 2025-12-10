import { APP_NAME } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="p-2 flex-center text-center">
        {currentYear} {APP_NAME}.{" "}
        <span>
          By messaging MyChatbot, you agree to our{" "}
          <a href="/terms" className="underline">
            Terms
          </a>{" "}
          and have read our{" "}
          <a href="/privacypolicy" className="underline">
            Privacy Policy
          </a>
          .
        </span>
      </div>
    </footer>
  );
};

export default Footer;
