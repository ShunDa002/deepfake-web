"use server";

import { logInFormSchema, signUpFormSchema } from "@/lib/validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatErrors } from "@/lib/utils";
import { AuthError } from "next-auth";

// Sign in user with credentials
export async function logInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = logInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const { email, password } = user;
    const lowerCaseEmail = email.toLowerCase();

    await signIn("credentials", {
      email: lowerCaseEmail,
      password,
    });

    return { success: true, message: "Logged in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "Invalid email or password" };
  }
}

// Sign out the user
export async function signOutUser() {
  await signOut();
}

// Sign up user
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const { name, email, password } = user;
    const hashedPassword = hashSync(password, 10);
    const lowerCaseEmail = email.toLowerCase();

    await prisma.user.create({
      data: {
        name,
        email: lowerCaseEmail,
        password: hashedPassword,
      },
    });

    await signIn("credentials", {
      email: lowerCaseEmail,
      password,
    });

    return { success: true, message: "Signed up successfully" };
  } catch (error) {
    // console.log(error.name);
    // console.log(error.code);
    // console.log(error.errors);
    // console.log(error.meta?.target);

    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: formatErrors(error) };
  }
}

// Sign in user with Google
export async function signInWithGoogle() {
  try {
    await signIn("google");
  } catch (error) {
    if (error instanceof AuthError) {
      return "Google log in failed";
    }
    throw error;
  }
}
