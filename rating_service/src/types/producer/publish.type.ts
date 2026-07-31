import { RatingEvent } from "../events/rating.event";
import { TOPIC_TYPE } from "../topics/topic.type";

export interface PublishType {
  headers: Record<string, any>;
  topic: TOPIC_TYPE;
  event: RatingEvent;
  message: Record<string, any>;
}