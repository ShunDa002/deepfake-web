"use client";

import { useActionState } from "react";
import { BsGoogle } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/actions/user.actions";

const GoogleLogin = () => {
  const [errorMsgGoogle, dispatchGoogle] = useActionState(
    signInWithGoogle,
    undefined
  );

  return (
    <form className="flex mt-4" action={dispatchGoogle}>
      <Button
        variant={"outline"}
        className="flex flex-row items-center gap-3 w-full"
      >
        <BsGoogle />
        Google Sign In
      </Button>
      <p className="text-red-500">{errorMsgGoogle}</p>
    </form>
  );
};

export default GoogleLogin;
