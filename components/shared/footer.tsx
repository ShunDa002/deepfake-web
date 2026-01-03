import { APP_NAME } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="p-2 flex-center text-center">
        {currentYear} {APP_NAME}.&nbsp;
        <span>
          By using {APP_NAME} services, you agree to our&nbsp;
          <a href="/terms" className="underline">
            Terms
          </a>
          &nbsp; and have read our&nbsp;
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
