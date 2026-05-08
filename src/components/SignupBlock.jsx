"use client";

import ButtonSecondary from "./ButtonSecondary";
import { useState } from "react";
import { RiLoader4Line } from "@remixicon/react";
import FormErrorMessage from "@/components/form/FormErrorMessage";

export default function SignupBlock({
  cta = "Sign up for our daily insider",
  id = "email",
  name = "email",
  className = "container-center",
}) {

  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const [error, setError] = useState(null);

  const handleError = (msg) => {
    console.log(msg);
    setError(msg);
    setState("error");
  };

  // Submission
  const handleSubmit = async (e) => {
    e.preventDefault();   // Prevent page reload

    // Ensure field has a value
    if (!email) {
      handleError("You must enter a valid email address");
      return;
    }

    try{
      setState("loading");

      const res = await fetch ("http://localhost:3001/", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ email: email })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setState("complete")
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  const handleInput = (newValue) => {
    setEmail(newValue);
  };

  // Modify content based on state
  let content;

  if (state == "idle" || state == "error") {
    content = (
      // FORM
      <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col md:flex-row w-full text-center sm:text-left items-center justify-center gap-6 lg:gap-15`}
      >
        {/* Call to action */}
        <label htmlFor={name} className="m-0 text-xl font-bold tracking-wide uppercase">
          {cta}
        </label>
        {/* Email input */}
        <input
          type="email"
          className="grow focus:border-(--clr-primary) border-2 rounded-full w-full border-transparent transition-all ease-in-out bg-bg-back placeholder-text-tertiary px-7 py-3 focus:outline-none"
          id={id}
          name={name}
          onChange={(e) => handleInput(e.target.value)}
          value={email}
          placeholder="student@deakin.edu.au"
        />
        {/* Submit */}
        <ButtonSecondary type="submit" className="mb-3 sm:mb-0">
          Subscribe
        </ButtonSecondary>
      </form>
      {error && <FormErrorMessage error={error} clasName={""} />}
      </div>
    );
  } else if (state == "loading") {
    content = (
      // LOADING
      <div className="flex items-center justify-center w-full">
        <RiLoader4Line className="animate-spin text-text-secondary" size={37} />
      </div>
    );
  } else {
    content = (
      // SUCCESS MESSAGE
      <div className="flex items-center justify-center w-full">
        Thanks for signing up!
      </div>
    );
  }

  return (
    <div className={`p-4 ${className}`}>
      {content}
    </div>
  );
}
