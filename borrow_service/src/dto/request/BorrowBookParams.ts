import { ParamsDictionary } from "express-serve-static-core";

export interface BorrowBookParams extends ParamsDictionary {
  bookId: string;
}