import {PublishType} from "../../types";

export type MessageBrokerType = {
  connectProducer: <T>() => Promise<T>;
  disconnectProducer: () => Promise<void>;
  publish: (data: PublishType) => Promise<boolean>;
};