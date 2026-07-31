import { Consumer, Producer } from "kafkajs";

import { MessageBroker } from "../utils/broker";

import {
  BorrowBook,
  ReturnBook,
  ApplyBookRating,
} from "./book.service";
import { MessageType } from "../types/consumer/message.type";
import { CatalogEvents } from "../types/events";

export const InitializeBroker = async (): Promise<void> => {
  const producer = await MessageBroker.connectProducer<Producer>();

  producer.on("producer.connect", () => {
    console.log("Catalog Service Producer connected successfully");
  });

  const consumer = await MessageBroker.connectConsumer<Consumer>();

  consumer.on("consumer.connect", () => {
    console.log("Catalog Service Consumer connected successfully");
  });

  await MessageBroker.subscribe(
    HandleMessage,
    "CatalogEvents"
  );
};

export const DisconnectBroker = async (): Promise<void> => {
  await MessageBroker.disconnectConsumer();
  await MessageBroker.disconnectProducer();
};

const HandleMessage = async (
  message: MessageType
): Promise<void> => {
  console.log("Catalog service received message", message);

  switch (message.event) {
    case CatalogEvents.BORROW_BOOK: {
      const { bookId, userId } = message.data as {
        bookId: number;
        userId: number;
      };

      await BorrowBook(bookId, userId);
      break;
    }

    case CatalogEvents.RETURN_BOOK: {
      const { bookId, userId } = message.data as {
        bookId: number;
        userId: number;
      };

      await ReturnBook(bookId, userId);
      break;
    }

    case CatalogEvents.BOOK_RATED: {
      const { bookId, rating } = message.data as {
        bookId: number;
        rating: number;
      };

      await ApplyBookRating(bookId, rating);
      break;
    }

    default:
      console.log("Unhandled catalog event:", message.event);
  }
};