import { Consumer, Producer } from "kafkajs";
import { MessageBroker } from "../utils/broker";
import { CatalogEvents, MessageType } from "../types";
import { BorrowBook, ReturnBook, ApplyBookRating } from "./book.service";

export class BrokerService {
  private producer: Producer | null = null;
  private consumer: Consumer | null = null;

  public async initializeBroker() {
    this.producer = await MessageBroker.connectProducer<Producer>();
    this.producer.on("producer.connect", async () => {
      console.log("Catalog Service Producer connected successfully");
    });

    this.consumer = await MessageBroker.connectConsumer<Consumer>();
    this.consumer.on("consumer.connect", async () => {
      console.log("Catalog Service Consumer connected successfully");
    });

    await MessageBroker.subscribe(
      this.handleMessage.bind(this),
      "CatalogEvents",
    );
  }

  private async handleMessage(message: MessageType) {
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
  }
}
