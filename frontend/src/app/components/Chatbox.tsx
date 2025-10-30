'use client'

import { useState, FormEvent, ChangeEvent } from "react";

interface Message {
    id: number;
    text: string;
}

export default function Chatbox() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Willkommen im KI-Chat!" },
    ]);
    const [input, setInput] = useState<string>("");

    const handleSend = (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        const newMessage: Message = {
            id: messages.length + 1,
            text: input,
        };
        setMessages([...messages, newMessage]);
        setInput("");
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    return (
        <div
            style={{
                position: "fixed",
                bottom: 20,
                right: 20,
                width: 300,
                height: 400,
                border: "1px solid #ccc",
                borderRadius: 8,
                backgroundColor: "white",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div
                style={{
                    flexGrow: 1,
                    overflowY: "auto",
                    padding: 10,
                    borderBottom: "1px solid #eee",
                }}
            >
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        style={{
                            margin: "10px 0",
                            padding: 8,
                            backgroundColor: "#f1f1f1",
                            borderRadius: 4,
                        }}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <form
                onSubmit={handleSend}
                style={{ display: "flex", padding: 10, borderTop: "1px solid #eee" }}
            >
                <input
                    type="text"
                    value={input}
                    onChange={handleChange}
                    placeholder="Nachricht eingeben..."
                    style={{
                        flex: 1,
                        padding: 8,
                        borderRadius: 4,
                        border: "1px solid #ccc",
                        marginRight: 8,
                    }}
                />
                <button type="submit" style={{ padding: "8px 16px" }}>
                    Senden
                </button>
            </form>
        </div>
    );
}
