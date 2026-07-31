import { Kafka, logLevel, Partitioners, Producer } from "kafkajs";
import { MessageBrokerType} from "./message.broker.type";
import { PublishType } from "../../types";

const CLIENT_ID = process.env.CLIENT_ID || "rating-service";
const BROKERS = [process.env.BROKER_1 || "localhost:9092"];

const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: BROKERS,
  logLevel: logLevel.INFO,
});

let producer: Producer;

const createTopic = async (topics: string[]) => {
  const topicConfigs = topics.map((t) => ({
    topic: t,
    numPartitions: 2,
    replicationFactor: 1,
  }));

  const admin = kafka.admin();
  await admin.connect();

  const existingTopics = await admin.listTopics();

  for (const topic of topicConfigs) {
    if (!existingTopics.includes(topic.topic)) {
      await admin.createTopics({
        topics: [topic],
      });
    }
  }

  await admin.disconnect();
};

const connectProducer = async <T>(): Promise<T> => {
  await createTopic(["CatalogEvents", "RatingEvents"]);

  if (producer) {
    return producer as unknown as T;
  }

  producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
  });

  await producer.connect();
  return producer as unknown as T;
};

const disconnectProducer = async (): Promise<void> => {
  if (producer) {
    await producer.disconnect();
  }
};

const publish = async (data: PublishType): Promise<boolean> => {
  const producer = await connectProducer<Producer>();

  const cleanHeaders = Object.fromEntries(
    Object.entries(data.headers || {}).filter(([_, v]) => v !== undefined),
  );

  const result = await producer.send({
    topic: data.topic,
    messages: [
      {
        headers: cleanHeaders,
        key: String(data.event),
        value: JSON.stringify(data.message),
      },
    ],
  });

  return result.length > 0;
};

export const MessageBroker: MessageBrokerType = {
  connectProducer,
  disconnectProducer,
  publish
};
