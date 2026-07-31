import { MessageType } from "../../types/consumer/message.type";
import { TOPIC_TYPE } from "../../types/topics";

export type MessageHandler = (input: MessageType) => void | Promise<void>;

export type MessageBrokerType = {
  connectProducer: <T>() => Promise<T>;
  disconnectProducer: () => Promise<void>;
  connectConsumer: <T>() => Promise<T>;
  disconnectConsumer: () => Promise<void>;
  subscribe: (messageHandler: MessageHandler, topic: TOPIC_TYPE) => Promise<void>;
};