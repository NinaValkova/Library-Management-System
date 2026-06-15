import { Producer } from "kafkajs";
import { MessageBroker } from "../utils/broker/message-broker";
import { RatingEvent } from "../types";

export const InitializeBroker = async () => {
  const producer = await MessageBroker.connectProducer<Producer>();
  producer.on("producer.connect", async () => {
    console.log("Rating producer connected successfully");
  });
};

export const SendBookRatedMessage = async (data: {
  bookId: number;
  rating: number;
}) => {
  await MessageBroker.publish({
    event: RatingEvent.BOOK_RATED,
    topic: "CatalogEvents",
    headers: {},
    message: data,
  });
};

export const SendSparkRatedMessage = async (data: {
  userId: number;
  bookId: number;
  rating: number;
}) => {
  await MessageBroker.publish({
    event: RatingEvent.BOOK_RATED,
    topic: "RatingEvents",
    headers: {},
    message: data,
  });
};