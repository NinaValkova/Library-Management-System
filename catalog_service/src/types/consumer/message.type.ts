import { CatalogEvents } from "../events";

export interface MessageType {
  headers?: Record<string, any>;
  event: CatalogEvents;
  data: Record<string, any>;
}
