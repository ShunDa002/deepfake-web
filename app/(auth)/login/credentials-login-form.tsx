"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { logInDefaultValues } from "@/lib/constants";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { logInWithCredentials } from "@/lib/actions/user.actions";

const CredentialsLogInForm = () => {
  const [data, action] = useActionState(logInWithCredentials, {
    success: false,
    message: "",
  });

  const LogInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "Logging in..." : "Log In"}
      </Button>
    );
  };

  return (
    <form action={action}>
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={logInDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="password"
            defaultValue={logInDefaultValues.password}
          />
        </div>
        <div>
          <LogInButton />
        </div>

        {data && !data.success && data.message && (
          <div className="text-center text-destructive">{data.message}</div>
        )}

        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" target="_self" className="link">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsLogInForm;
