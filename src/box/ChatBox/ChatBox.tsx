import React from 'react';
import { Message } from '../Message';
import { useMessages } from '../useMessages';
import './ChatBox.css';
import { ChatBoxInput, OnChatMessageSend } from './ChatBoxInput';
import { ChatBoxOutput } from './ChatBoxOutput';

const peer = `User ${new Date().getTime()}`;

export const ChatBox: React.FC = () => {

  const { msgs, send } = useMessages();

  const onMessageSend: OnChatMessageSend = (msg: Message) => {
    send(msg);
  };

  return <div className="chatBox">
    <ChatBoxOutput msgs={msgs} />
    <ChatBoxInput peer={peer} onMessageSend={onMessageSend} />
  </div>
}