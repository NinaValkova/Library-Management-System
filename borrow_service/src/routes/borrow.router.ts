import { Router } from "express";

import {
  borrowBook,
  returnBook,
  getCurrentBorrows,
  getBorrowHistory,
  getLoanItems,
  getActiveBorrowsCount,
} from "../api/borrow";

import { requestAuthorizer } from "../middleware/authorizer";

const borrowRouter = Router();

borrowRouter.post(
  "/borrow/:bookId",
  requestAuthorizer,
  borrowBook
);

borrowRouter.post(
  "/return/:bookId",
  requestAuthorizer,
  returnBook
);

borrowRouter.get(
  "/borrow/active-count",
  getActiveBorrowsCount
);

borrowRouter.get(
  "/borrow/current",
  requestAuthorizer,
  getCurrentBorrows
);

borrowRouter.get(
  "/borrow/history",
  requestAuthorizer,
  getBorrowHistory
);

borrowRouter.get(
  "/borrow/loans",
  requestAuthorizer,
  getLoanItems
);

export default borrowRouter;