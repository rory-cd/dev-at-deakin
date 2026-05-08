"use client";

import TextAreaInput from "@/components/form/TextAreaInput";
import ButtonSmallPrimary from "@/components/ButtonSmallPrimary";
import { useState, useEffect, useContext } from "react";
import { RiRobot2Line } from "@remixicon/react";
import { getChatHistory, createChatInstance, promptAIChat } from "@/libs/firebase";
import LoadingIcon from "@/components/LoadingIcon";
import { UserContext } from "@/context/UserContext";
import PremiumGuard from "./PremiumGuard";

export default function AIHelper({ question }) {

  const { user } = useContext(UserContext);
  const [inputText, setInputText] = useState("");
  const [chatInstance, setChatInstance] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name, value) => {
    setInputText(value);
  };

  const handleResponse = (input, res) => {
    setConversation(prev => [...prev, input, res]);
  }

  useEffect(() => {
    const fetchHistory = async (userId) => {
      const history = await getChatHistory(userId, question.id);
      setConversation(history.splice(1));

      // If this is the first message (this session), make a new chat instance
      if (!chatInstance) {
        const chat = createChatInstance(history);
        setChatInstance(chat);
      }
    }
    if (user) fetchHistory(user.uid);
  }, [user, chatInstance]);

  const onSubmit = async () => {
    setIsSubmitting(true);
    const input = inputText;  // Save this for later
    setInputText("");
    const response = await promptAIChat(chatInstance, conversation, input, question);
    const inputObject = { role: "user", parts: [{ text: input }] }
    handleResponse(inputObject, response);
    setIsSubmitting(false);
  }

  return (
    <PremiumGuard>
      <div className="relative flex flex-col w-100 ml-5 mt-10 p-5 md:p-10 mid-dark-v-gradient">
        <div className="flex-1">
          <div className="flex gap-3 items-center flex-row">
            <RiRobot2Line className="text-(--clr-primary)" />
            <h3 className="mb-1 font-heading uppercase text-[1.2rem] tracking-[0.05rem] font-[400]">
              Devbot AI Helper
            </h3>
          </div>
          {/* Responses */}
          <div className="mt-4 h-auto max-h-150 pr-4 overflow-y-auto">
            {conversation.length > 0 && conversation.map((msg, idx) => (
              <div className={`${msg.role == "model" ? "bg-bg-back rounded-xl px-5 py-4 ml-2 mb-4" : "mb-4"}`} key={idx}>
                <h3 className="text-(--clr-primary)">{msg.role == "model" ? "Devbot" : "Me"}</h3>
                <p className="text-[0.92rem]">{msg.parts[0].text}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Input box */}
        <div className={`relative mt-5`}>
          <TextAreaInput
            label=""
            name="comment"
            height="6rem"
            value={inputText}
            onTextChange={handleChange}
            onFieldKeyDown={(key) => key === 'Enter' && onSubmit()}
            placeholder="Ask AI about this question"
            className="mb-5"
          />
          <ButtonSmallPrimary type="button" onClick={onSubmit}>
            Ask AI
          </ButtonSmallPrimary>

        </div>
        {isSubmitting && <LoadingIcon className="absolute inset-0 z-50" />}
      </div>
    </PremiumGuard>
  );
}