import { ParamsDictionary } from "express-serve-static-core";

export interface RatingBookParams extends ParamsDictionary {
  bookId: string;
}