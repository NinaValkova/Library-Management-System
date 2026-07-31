import { Consumer, Kafka, logLevel, Partitioners, Producer } from "kafkajs";
import { MessageType } from "../../types/consumer/message.type";
import { CatalogEvents } from "../../types/events";
import { MessageBrokerType, MessageHandler } from "./message.broker.type";
import { TOPIC_TYPE } from "../../types/topics";

const CLIENT_ID = process.env.CLIENT_ID || "catalog-service";
const GROUP_ID = process.env.GROUP_ID || "catalog-service-group";
const BROKERS = [process.env.BROKER_1 || "localhost:9092"];

const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: BROKERS,
  logLevel: logLevel.INFO,
});

let producer: Producer;
let consumer: Consumer;

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
  await createTopic(["CatalogEvents"]);

  if (producer) {
    return producer as unknown as T;
  }

  producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
  });

  await producer.connect();
  console.log("producer connected");

  return producer as unknown as T;
};

const disconnectProducer = async (): Promise<void> => {
  if (producer) {
    await producer.disconnect();
  }
};

const connectConsumer = async <T>(): Promise<T> => {
  if (consumer) {
    return consumer as unknown as T;
  }

  consumer = kafka.consumer({
    groupId: GROUP_ID,
  });

  await consumer.connect();
  console.log("consumer connected");

  return consumer as unknown as T;
};

const disconnectConsumer = async (): Promise<void> => {
  if (consumer) {
    await consumer.disconnect();
  }
};

const subscribe = async (
  messageHandler: MessageHandler,
  topic: TOPIC_TYPE,
): Promise<void> => {
  const consumer = await connectConsumer<Consumer>();

  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic: receivedTopic, partition, message }) => {
      if (receivedTopic !== topic) return;

      if (message.key && message.value) {
        const inputMessage: MessageType = {
          headers: message.headers,
          event: message.key.toString() as CatalogEvents,
          data: JSON.parse(message.value.toString()),
        };

        await messageHandler(inputMessage);

        await consumer.commitOffsets([
          {
            topic: receivedTopic,
            partition,
            offset: (Number(message.offset) + 1).toString(),
          },
        ]);
      }
    },
  });
};

export const MessageBroker: MessageBrokerType = {
  connectProducer,
  disconnectProducer,
  connectConsumer,
  disconnectConsumer,
  subscribe,
};
