import { useCallback, useEffect, useState } from 'react'
import { Message } from './Message'
import { MessageService } from './MessageService'
import { useMessageService } from './MessageServiceContext'

export interface UseMessagesResult { 
  msgs: Message[];
  send: MessageService['send'];
}

export const useMessages = (): UseMessagesResult => {
  const service = useMessageService();
  const [msgs, setMsgs] = useState<Message[]>([]);

  useEffect(() => {

    const sub = service.listenForMessages((_msgs) => {
      setMsgs(_msgs);
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  const send = useCallback((msg: Message) => {
    return service.send(msg);
  }, [service]);

  return {
    msgs,
    send
  };
}