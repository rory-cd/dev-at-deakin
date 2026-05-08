"use client";

import Modal from "@/components/Modal";
import LoginForm from "@/components/form/LoginForm";
import SignupForm from "@/components/form/SignupForm"
import { RiCloseLine } from "@remixicon/react";
import { useState } from "react";

export default function LoginModal({ show, onClose, onLogin, signUp=false }) {

  const [newUser, setNewUser] = useState(signUp);

  return (
    <Modal show={show} onClose={onClose}>
      <div className="bg-bg-front rounded-xl shadow-xl/30 p-15 flex relative flex-col min-w-120">
        <button 
          className="absolute top-10 right-10 cursor-pointer text-text-secondary"
          onClick={onClose}
        >
          <RiCloseLine />
        </button>
        {newUser ? (
          <SignupForm onExistingUser={() => setNewUser(false)} afterSignup={onLogin} />
        ): (
          <LoginForm onNewUser={() => setNewUser(true)} afterLogin={onLogin} />
        )}
      </div>
    </Modal>
  );
}