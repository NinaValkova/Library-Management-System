import { Consumer, Producer } from "kafkajs";
import { MessageBroker } from "../utils";
import { BorrowEvent } from "../types";

export const InitializeBroker = async () => {
  const producer = await MessageBroker.connectProducer<Producer>();
  producer.on("producer.connect", async () => {
    console.log("Borrow producer connected successfully");
  });

  const consumer = await MessageBroker.connectConsumer<Consumer>();
  consumer.on("consumer.connect", async () => {
    console.log("Borrow consumer connected successfully");
  });

  await MessageBroker.subscribe(async (message) => {
    console.log("Borrow service received message", message);
  }, "BorrowEvents");
};

export const SendBorrowBookMessage = async (data: { bookId: number; userId: number }) => {
  await MessageBroker.publish({
    event: BorrowEvent.BORROW_BOOK,
    topic: "CatalogEvents",
    headers: {},
    message: data,
  });
};

export const SendReturnBookMessage = async (data: { bookId: number; userId: number }) => {
  await MessageBroker.publish({
    event: BorrowEvent.RETURN_BOOK,
    topic: "CatalogEvents",
    headers: {},
    message: data,
  });
};