"use client";

import SignupForm from "@/components/form/SignupForm";
import LoginForm from "@/components/form/LoginForm";
import ForgotPasswordForm from "@/components/form/ForgotPasswordForm";
import { useState } from "react";

export default function Registration({ defaultState="login", path="/"}) {

  const [state, setState] = useState(defaultState);

  let content;

  switch (state) {
    case "login":
      content =
        <LoginForm
          path={path}
          onNewUser={() => setState("signup")}
          onForgot={() => setState("forgot")}
        />;
      break;
    case "signup":
      content =
        <SignupForm
          path={path}
          onExistingUser={() => setState("login")}
        />;
      break;
    default:
      content =
        <ForgotPasswordForm
          onNewUser={() => setState("signup")}
          onBack={() => setState("login")}
        />;
  }

  return (
    <div>
      {content}
    </div>
  );
}