'use client'

import {useState} from "react";
import Chatbox from "./Chatbox";

export interface Message {
    id: number;
    text: string;
    sender: "user" | "ai";
}

export type Mode = "primary" | "failure";

export default function ChatboxWrapper() {

    const [messages, setMessages] = useState<Message[]>([
        {id: 1, text: "Willkommen im KI-Chat!", sender: 'ai'},
    ]);

    const [mode, setMode] = useState<Mode>("primary");

    return <Chatbox messages={messages} setMessages={setMessages} mode={mode} setMode={setMode} />;
}