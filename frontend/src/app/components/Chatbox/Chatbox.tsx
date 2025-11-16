'use client'

import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {Message, Mode} from "./ChatboxWrapper";
import SubmitButton from "../SubmitButton";

interface ChatboxUIProps {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    mode: Mode;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

export default function Chatbox({messages, setMessages, mode, setMode}: ChatboxUIProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsMinimized(true);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

        try {
            const response: AxiosResponse<string> = await axios.get(
                "/api/chat",
                {params: {userInput: JSON.stringify(input.trim())}}
            );
            setMode("primary");
            addAiMessageWithTyping(response.data);
        } catch (error) {
            setMode("failure");
            addAiMessageWithTyping("Es ist ein Fehler aufgetreten.");
        }

        setInput("");
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const primaryStyle: React.CSSProperties = {
        position: "fixed",
        bottom: 16,
        right: 20,
        width: 500,
        height: 500,
        borderRadius: 8,
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        backgroundColor: "#fafafa",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
    };

    const modeStyle: React.CSSProperties = mode === 'failure'
        ? {backgroundColor: '#842029'}
        : {backgroundColor: '#fafafa'};

    const combinedStyle: React.CSSProperties = {...primaryStyle, ...modeStyle};

    const primaryRefStyle: React.CSSProperties = {
        flex: 1,
        overflowY: 'auto',
        padding: 16,
        backgroundColor: '#d0eaff', // dezentes Hellblau
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: '100%',
        boxSizing: 'border-box',
        borderRadius: 8,
        color: '#004a99', // dunkles Blau für Text, guter Kontrast
        fontSize: '1rem',
    };

    const modeRefStyle: React.CSSProperties = mode === 'failure'
        ? {
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c2c7',
            boxShadow: '0 2px 8px rgba(248, 215, 218, 0.5)',
            borderRadius: 8,
            padding: 16,
        }
        : {
            backgroundColor: '#fafafa',
        };

    const combinedRefStyle: React.CSSProperties = {...primaryRefStyle, ...modeRefStyle};

    return (
        <>
            {isMinimized && (
                <div
                    onClick={() => setIsMinimized(!isMinimized)}
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        padding: "8px 16px",
                        backgroundColor: "deepskyblue",
                        height: 48,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        cursor: "pointer",
                        userSelect: "none",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 20,
                        position: "fixed",
                        bottom: 20,
                        right: 20,
                        width: 500,
                        zIndex: 1001,
                        boxSizing: "border-box",
                        textAlign: "right",
                    }}
                >
                    <div style={{width: "100%", textAlign: "right"}}>
                        Chat with AI
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMinimized(true);
                        }}
                        aria-label="Chat schließen"
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "white",
                            fontSize: 24,
                            cursor: "pointer",
                            fontWeight: "bold",
                            marginLeft: "auto",
                            lineHeight: 1,
                        }}
                    >
                        &times;
                    </button>
                </div>
            )}


            {!isMinimized && (
                <div style={combinedStyle} ref={containerRef}>
                    <div
                        style={{
                            position: "fixed",
                            right: 20,
                            width: 500,
                            height: 500,
                            borderRadius: 8,
                            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                            backgroundColor: "#fafafa",
                            display: "flex",
                            flexDirection: "column",
                            zIndex: 1000,
                        }}
                    >

                        <div
                            style={{
                                height: 45,
                                backgroundColor: "deepskyblue",
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "0 16px",
                                fontWeight: "bold",
                                fontSize: 18,
                            }}
                        >
                            Chat
                            <button
                                onClick={() => setIsMinimized(true)}
                                aria-label="[translate:Chat schließen]"
                                style={{
                                    background: "transparent",
                                    border: "none",
                                    color: "white",
                                    fontSize: 24,
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    lineHeight: 1,
                                }}
                            >
                                &times;
                            </button>
                        </div>
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
                                style={combinedRefStyle}
                            >

                                {messages.map(msg => (
                                    <div
                                        key={msg.id}
                                        style={{
                                            padding: 10,
                                            gap: 10,
                                            backgroundColor: msg.sender === 'user' ? '#2c3e50' : '#f5f5f5',
                                            borderRadius: 8,
                                            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                            maxWidth: '80%',
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-word',
                                            color: msg.sender === 'user' ? 'white' : 'black',
                                            boxShadow: msg.sender === 'user' ? '0 2px 6px rgba(44, 62, 80, 0.5)' : 'none',
                                            fontSize: 16,
                                        }}
                                    >
                                        {msg.text}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />

                            </div>
                        </div>

                        <form
                            onSubmit={handleSend}
                            style={{display: "flex", padding: 10, borderTop: "1px solid #eee", marginTop: "auto"}}
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
                                    border: `1px solid ${mode === 'failure' ? '#dc3545' : '#ccc'}`,
                                    marginRight: 8,
                                    fontSize: 16,
                                    backgroundColor: loading ? '#e0e0e0' : 'white',  // etwas dunkleres Grau als #f0f0f0
                                    color: loading ? '#a0a0a0' : 'black',            // direkter Kontrast: etwas dunkleres Grau
                                    cursor: loading ? 'not-allowed' : 'text',
                                    userSelect: loading ? 'none' : 'auto',           // Benutzer kann keinen Text markieren wenn disabled
                                    opacity: loading ? 0.7 : 1,                       // leichte Transparenz für ausgegrauten Look
                                    transition: 'border-color 0.3s, background-color 0.3s, color 0.3s, opacity 0.3s',
                                }}
                                disabled={loading}
                                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend(e)}
                            />
                            <SubmitButton loading={loading}/>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
