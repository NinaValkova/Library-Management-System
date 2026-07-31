import { Producer } from "kafkajs";
import { MessageBroker } from "../utils/broker/message-broker";
import { RatingEvent } from "../types";

export const InitializeBroker = async () => {
  const producer = await MessageBroker.connectProducer<Producer>();
  producer.on("producer.connect", async () => {
    console.log("Rating producer connected successfully");
  });
};

export const DisconnectBroker = async (): Promise<void> => {
  await MessageBroker.disconnectProducer();
};

export const SendBookRatedMessage = async (data: {
  bookId: number;
  rating: number;
}) => {
  await MessageBroker.publish({
    headers: {},
    topic: "CatalogEvents",
    event: RatingEvent.BOOK_RATED,
    message: data,
  });
};

export const SendSparkRatedMessage = async (data: {
  userId: number;
  bookId: number;
  rating: number;
}) => {
  await MessageBroker.publish({
    headers: {},
    topic: "RatingEvents",
    event: RatingEvent.BOOK_RATED,
    message: data,
  });
};