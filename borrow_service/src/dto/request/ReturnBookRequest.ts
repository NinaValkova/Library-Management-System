import { ParamsDictionary } from "express-serve-static-core";

export interface ReturnBookParams extends ParamsDictionary {
  bookId: string;
}