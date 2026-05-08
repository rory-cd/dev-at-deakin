"use client";

import TextInput from "@/components/form/TextInput";
import useForm from "@/hooks/useForm";
import { ResetPasswordSchema } from "@/schemas/authSchemas";
import { forgotPassword } from "@/libs/firebase"
import { useState } from "react";
import { useRouter } from "next/navigation";
import ButtonSecondary from '@/components/ButtonSecondary';
import LoadingIcon from "@/components/LoadingIcon";
import { RiArrowLeftLine } from "@remixicon/react";

export default function ForgotPasswordForm({ onNewUser, onBack }) {

  const [submitted, setSubmitted] = useState();
  const router = useRouter();

  const defaults = { email: "" };

  const onSubmit = async () => {
    // Send email
    try {
      console.log("sdafsdf");
      await forgotPassword(values.email);
      setIsSubmitting(false);
      setSubmitted(true);
    }
    catch (err) {
      // Firebase errors
      setBackEndErrors("email", err.message);
      console.log(err.message);
    }
  };

  // Set form state
  const { values, errors, isSubmitting, handleInput, handleSubmit, setBackEndErrors, setIsSubmitting } = useForm(
    defaults, ResetPasswordSchema, onSubmit
  );

  return (
    <form onSubmit={handleSubmit} noValidate className={`${isSubmitting && "form-disabled"} relative flex flex-col gap-6`}>
      <RiArrowLeftLine onClick={onBack} size={19} className="absolute top-2 text-text-secondary cursor-pointer left-0 mr-1" />
      <h2 className="text-[1.5rem] font-[500] mb-2 font-heading uppercase text-center">Reset password</h2>
      {submitted ? (
        <p className="text-center">Email successfully sent. Please check your email to reset your password.</p>
      ) : (
        <>
          <p className="text-center text-text-secondary">Enter your email address and we'll send you a link to reset your password</p>
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
          <ButtonSecondary type="submit">
            Reset password
          </ButtonSecondary>
        </>
      )}
      <p className="text-center">Don't have an account?&nbsp; <span className="text-link cursor-pointer" onClick={onNewUser}>Sign Up</span></p>

      {isSubmitting && <LoadingIcon className="absolute inset-0 z-50" />}
    </form>
  );
} 