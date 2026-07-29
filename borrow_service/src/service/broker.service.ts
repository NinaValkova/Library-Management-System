import { Producer } from "kafkajs";
import { MessageBroker } from "../utils";
import { BorrowEvent } from "../types";

export const InitializeBroker = async () => {
  const producer = await MessageBroker.connectProducer<Producer>();
  producer.on("producer.connect", async () => {
    console.log("Borrow producer connected successfully");
  });
};

export const DisconnectBroker = async (): Promise<void> => {
  await MessageBroker.disconnectProducer();
};

export const SendBorrowBookMessage = async (data: { bookId: number; userId: number }) => {
  await MessageBroker.publish({
    headers: {},
    topic: "CatalogEvents",
    event: BorrowEvent.BORROW_BOOK,
    message: data,
  });
};

export const SendReturnBookMessage = async (data: { bookId: number; userId: number }) => {
  await MessageBroker.publish({
    headers: {},
    topic: "CatalogEvents",
    event: BorrowEvent.RETURN_BOOK,
    message: data,
  });
};