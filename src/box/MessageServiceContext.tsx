import React, { useContext } from 'react';
import { Message } from './Message';
import { MessageService, OnMessagesReceived, Subscription } from './MessageService';

const MessageServiceContext = React.createContext<MessageService | null>(null);

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

class DefaultMessageService implements MessageService {
  
  listenForMessages(onMessagesReceived: OnMessagesReceived): Subscription {
    const sub = setInterval(() => {
      (async () => {
        const response = await fetch('http://localhost:3001/messages');
        const msgs = await response.json();
        onMessagesReceived(msgs);
      })();
    }, 1000);

    return {
      sub,
      unsubscribe: () => {
        clearInterval(sub);
      }
    };
  }

  async send(msg: Message): Promise<void> {
    return postData('http://localhost:3001/messages', msg);
  }
}

export interface MessageServiceContextProviderProps {
  service?: MessageService;
}

export const MessageServiceContextProvider: React.FC<MessageServiceContextProviderProps> = ({ children, service = new DefaultMessageService() }) => {
  return <MessageServiceContext.Provider value={service}>
    {children}
  </MessageServiceContext.Provider>
}

export const useMessageService = (): MessageService => {
  return useContext(MessageServiceContext)!;
}