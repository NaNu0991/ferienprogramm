'use client'

import {useState, useEffect, useRef, FormEvent, ChangeEvent} from "react";
import axios, {AxiosResponse} from "axios";

interface Message {
    id: number;
    text: string;
    sender: "user" | "ai";
}

export default function Chatbox() {
    const [messages, setMessages] = useState<Message[]>([
        {id: 1, text: "Willkommen im KI-Chat!", sender: 'ai'},
    ]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);

    const addAiMessageWithTyping = (fullText: string) => {
        const id = messages.length + 2;
        setMessages(prev => [...prev, {id, text: '', sender: 'ai'}]);


        let index = 0;
        const interval = setInterval(() => {
            index++;
            setMessages(prev => {
                return prev.map(msg => {
                    if (msg.id === id) {
                        return {...msg, text: fullText.slice(0, index)};
                    }
                    return msg;
                });
            });
            if (index === fullText.length) {
                clearInterval(interval);
                setLoading(false);
            }
        }, 50);
    };


    const handleSend = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setLoading(true);

        setMessages(prev => {
            const newMessage: Message = {id: prev.length + 1, text: input, sender: "user"};
            return [...prev, newMessage];
        });

        const response: AxiosResponse<string> = await axios.get(
            "/api/chat",
            {params: {userInput: JSON.stringify(input.trim())}}
        );

        addAiMessageWithTyping(response.data);
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
                width: 500,
                height: 700,
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
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div
                    ref={containerRef}
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: 16,
                        backgroundColor: '#fafafa',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        width: '100%',
                        boxSizing: 'border-box',
                    }}
                >
                    {messages.map(msg => (
                        <div
                            key={msg.id}
                            style={{
                                padding: 8,
                                backgroundColor: msg.sender === 'user' ? '#d1e7dd' : '#f1f1f1',
                                borderRadius: 4,
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '100%',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                            }}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>
            </div>

            <form
                onSubmit={handleSend}
                style={{display: "flex", padding: 10, borderTop: "1px solid #eee"}}
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
                        fontSize: 16,
                        backgroundColor: loading ? "#f0f0f0" : "white",
                        color: loading ? "#999" : "black",
                        cursor: loading ? "not-allowed" : "text"
                    }}
                    disabled={loading}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend(e)}
                />
                <button type="submit" style={{
                    padding: "8px 16px",
                    backgroundColor: loading ? "#ccc" : "#007bff",
                    color: loading ? "#666" : "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "background-color 0.3s",
                }} disabled={loading}>
                    {loading ? "..." : "Senden"}
                </button>
            </form>
        </div>
    );
}
