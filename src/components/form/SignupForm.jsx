"use client";

import TextInput from "@/components/form/TextInput";
import useForm from "@/hooks/useForm";
import { SignupSchema } from "@/schemas/authSchemas";
import { signUp } from "@/libs/firebase"
import { useRouter } from "next/navigation";
import ButtonSecondary from '@/components/ButtonSecondary';
import LoadingIcon from "@/components/LoadingIcon";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

export default function SignupForm({ onExistingUser, path }) {

  const router = useRouter();

  const defaults = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const onSubmit = async () => {
    // Sign up via Firebase
    try {
      const user = await signUp(values.name, values.email, values.password, "free");
      console.log(user + " signed up");
      router.push(path);
    }
    catch (err) {
      // Firebase errors
      if (err.code === "auth/email-already-in-use") {
        setBackEndErrors("email", "Email already in use")
      } else if (err.code === "auth/weak-password") {
        setBackEndErrors("password", "Password too weak")
      } else {
        setBackEndErrors("firebase", err.message);
        console.log(err.message);
      }
    }
  };

  // Set form state
  const { values, errors, isSubmitting, handleInput, handleSubmit, setBackEndErrors, setIsSubmitting } = useForm(
    defaults, SignupSchema, onSubmit
  );

  return (
    <form onSubmit={handleSubmit} noValidate className={`${isSubmitting && "form-disabled"} relative flex flex-col gap-6`}>
      <h2 className="text-[1.5rem] font-[500] font-heading uppercase text-center">Create new account</h2>
      <TextInput 
        label="name"
        name="name"
        value={values.name}
        onTextChange={handleInput}
        placeholder="Your name"
        autoComplete="name"
        error={errors.name}
        required
      />

      <TextInput 
        label="email"
        name="email"
        type="email"
        value={values.email}
        onTextChange={handleInput}
        placeholder="student@deakin.edu.au"
        autoComplete="email"
        error={errors.email}
        required
      />

      <TextInput 
        label="password"
        name="password"
        type="password"
        value={values.password}
        onTextChange={handleInput}
        placeholder="Enter password"
        autoComplete="new-password"
        error={errors.password}
        required
      />

      <TextInput 
        label="confirm password"
        name="confirmPassword"
        type="password"
        value={values.confirmPassword}
        onTextChange={handleInput}
        placeholder="Re-enter password"
        autoComplete="new-password"
        error={errors.confirmPassword}
        required
      />

      <ButtonSecondary type="submit">
        Sign up
      </ButtonSecondary>
      <p className="text-center">Already have an account?&nbsp; <span className="text-link cursor-pointer" onClick={onExistingUser}>Log In</span></p>

      {isSubmitting && <LoadingIcon className="absolute inset-0 z-50" />}
    </form>
  );
} 