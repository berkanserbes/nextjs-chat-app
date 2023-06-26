"use client";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "../styles/chats.css";

const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);

const MessageForSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageForSocial)
);

export default function Page() {
  const { username, secret } = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== null) {
      setShowChat(true);
    }
  });

  useEffect(() => {
    if (username.length === 0 || secret.length === 0) router.push("/");
  }, [username, secret]);

  if (!showChat) return <div />;

  return (
    <div className="background">
      <div className="shadow">
        <ChatEngine
          height="calc(100vh - 200px)"
          projectID={process.env.NEXT_PUBLIC_PROJECT_ID}
          userName={username}
          userSecret={secret}
          renderNewMessage={() => <MessageForSocial />}
        />
      </div>
    </div>
  );
}
