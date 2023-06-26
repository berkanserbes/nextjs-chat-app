"use client";

import React, { useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./styles/auth.css";

export default function Auth() {
  const { username, setUsername, secret, setSecret } = useContext(Context);
  const router = useRouter();

  function onSubmit(e) {
    e.preventDefault();
    if (username.length === 0 || secret.length === 0) {
      alert("Email and Password area must be filled");
    }
    axios
      .put(
        `https://api.chatengine.io/users/`,
        {
          secret,
          username,
        },
        { headers: { "Private-key": process.env.NEXT_PUBLIC_PRIVATE_KEY } }
      )
      .then((res) => router.push("/chats"));
  }

  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
          <div className="auth-title">Next.js Chat</div>
          <div className="input-container">
            <input
              placeholder="Email"
              className="text-input"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              className="text-input"
              onChange={(e) => setSecret(e.target.value)}
              value={secret}
            />
          </div>
          <button type="submit" className="submit-button">
            Login / Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
