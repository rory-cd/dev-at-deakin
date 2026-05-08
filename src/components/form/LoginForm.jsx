"use client";

import TextInput from "@/components/form/TextInput";
import useForm from "@/hooks/useForm";
import { LoginSchema } from "@/schemas/authSchemas";
import { logIn } from "@/libs/firebase"
import { useRouter } from "next/navigation";
import ButtonSecondary from '@/components/ButtonSecondary';
import LoadingIcon from "@/components/LoadingIcon";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

export default function LoginForm({ onNewUser, onForgot, path }) {

  const router = useRouter();

  const defaults = {
    email: "",
    password: ""
  };

  const onSubmit = async () => {
    // Log in via Firebase
    try {
      const user = await logIn(values.email, values.password);
      console.log(user + " logged in");
      router.push(path);
    }
    catch (err) {
      // Firebase errors
      if (err.code === "auth/missing-email" || err.code === "auth/invalid-credential") {
        setBackEndErrors("email", `User with email ${values.email} not found`)
      } else if (err.code === "auth/user-disabled") {
        setBackEndErrors("email", `User with email ${values.email} disabled`)
      } else if (err.code === "auth/wrong-password") {
        setBackEndErrors("password", "Wrong password")
      } else {
        setBackEndErrors("firebase", err.message);
        console.log(err.message);
      }
    }
  };

  // Set form state
  const { values, errors, isSubmitting, handleInput, handleSubmit, setBackEndErrors } = useForm(
    defaults, LoginSchema, onSubmit
  );

  return (
    <form onSubmit={handleSubmit} noValidate className={`${isSubmitting && "form-disabled"} relative flex flex-col gap-6`}>
      <h2 className="text-[1.5rem] font-[500] mb-2 font-heading uppercase text-center">Log in to your account</h2>
      <TextInput 
          label="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onTextChange={handleInput}
          placeholder="student@deakin.edu.au"
          error={errors.email}
          required
      />
      <TextInput 
          label="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={values.password}
          onTextChange={handleInput}
          placeholder="Enter password"
          error={errors.password}
          required
      />
      <ButtonSecondary type="submit">
          Log in
      </ButtonSecondary>
      <p className="text-center">Don't have an account?&nbsp; <a className="text-link cursor-pointer" onClick={onNewUser}>Sign Up</a></p>
      <a className="text-center text-link cursor-pointer" onClick={onForgot}>Forgot password</a>

      {isSubmitting && <LoadingIcon className="absolute inset-0 z-50" />}
    </form>
  );
} 