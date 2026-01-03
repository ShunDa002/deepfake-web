import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import CredentialsLogInForm from "./credentials-login-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import GoogleLogin from "@/components/shared/auth/google-button";
import { BackButton } from "@/components/shared/auth/back-button";
import { CardFooter } from "@/components/ui/card";
import Logo from "@/components/shared/header/logo";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = async () => {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-2 pb-4">
          <Link href="/" className="flex-center">
            <Logo />
          </Link>
          <CardTitle className="text-center">Log In</CardTitle>
          <CardDescription className="text-center">
            Log in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <CredentialsLogInForm />
          <GoogleLogin />
        </CardContent>
        <CardFooter>
          <BackButton
            href="/sign-up"
            text="Don't have an account?"
            linkText="Sign Up"
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;
