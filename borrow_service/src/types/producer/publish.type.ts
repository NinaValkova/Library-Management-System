import { BorrowEvent } from "../events/borrow.event";
import { TOPIC_TYPE } from "../topics/topic.type";

export interface PublishType {
  headers: Record<string, any>;
  topic: TOPIC_TYPE;
  event: BorrowEvent;
  message: Record<string, any>;
}
