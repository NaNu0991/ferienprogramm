'use client';

import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Chatbox from '../app/components/Chatbox/Chatbox';
import { Message } from '../app/components/Chatbox/ChatboxWrapper';

export default {
    title: 'Components/Chatbox',
    component: Chatbox,
} as Meta<typeof Chatbox>;

export const Default: StoryObj<typeof Chatbox> = {
    render: (args) => {
        const [messages, setMessages] = useState<Message[]>(args.messages);
        return <Chatbox {...args} messages={messages} setMessages={setMessages} />;
    },
    args: {
        messages: [
            { id: 1, text: "Willkommen im KI-Chat!", sender: 'ai' }
        ],
    },
};
