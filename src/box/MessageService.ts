import { Message } from './Message';

export type Subscription = {
  sub: unknown;
  unsubscribe: () => void;
};

export interface OnMessagesReceived {
  (msgs: Message[]): void;
}

export interface MessageService {
  listenForMessages(onMessagesReceived: OnMessagesReceived): Subscription;
  send(msg: Message): Promise<void>;
}