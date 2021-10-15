import { Message } from '../../Message';
import './ChatBoxOutput.css';

export interface ChatBoxOutputProps {
  msgs: Message[];
}

export const ChatBoxOutput: React.FC<ChatBoxOutputProps> = ({ msgs }) => {
  return <div className="chatBoxOutput">
    {
      msgs.map((msg, i) => <div key={i}>{msg.peer} - {msg.msg}</div>)
    }
  </div>
}