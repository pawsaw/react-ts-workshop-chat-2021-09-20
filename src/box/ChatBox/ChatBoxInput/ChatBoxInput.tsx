import { useState } from 'react';
import { Message } from '../../Message';
import './ChatBoxInput.css';

export interface OnChatMessageSend {
  (msg: Message): void;
}

export interface ChatBoxInputProps {
  peer: string;
  onMessageSend: OnChatMessageSend;
}

export const ChatBoxInput: React.FC<ChatBoxInputProps> = ({ onMessageSend, peer }) => {

  const [myMsg, setMyMsg] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault(); 
    onMessageSend({ peer, msg: myMsg });
    setMyMsg(''); 
  };

  return <div className="chatBoxInput">
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Your message" value={myMsg} onChange={(e) => setMyMsg(e.target.value)}/>
      <button>Send</button>
    </form>
  </div>
}