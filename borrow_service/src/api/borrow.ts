import express, { Request, Response, NextFunction } from "express";
import {
  BorrowBook,
  ReturnBook,
  GetCurrentBorrows,
  GetBorrowHistory,
  GetLoanItems,
  GetActiveBorrowsCount,
} from "../service/borrow.service";
import { RequestAuthorizer } from "../routes/middleware";

const router = express.Router();

router.post("/borrow/:bookId", RequestAuthorizer, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }

    const bookId = parseInt(req.params.bookId as string, 10);
    const response = await BorrowBook(user.id, bookId);

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/return/:bookId", RequestAuthorizer, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }

    const bookId = parseInt(req.params.bookId as string, 10);
    const response = await ReturnBook(user.id, bookId);

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/borrow/active-count", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await GetActiveBorrowsCount();
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/borrow/current", RequestAuthorizer, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }

    const response = await GetCurrentBorrows(user.id);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/borrow/history", RequestAuthorizer, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }

    const response = await GetBorrowHistory(user.id);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/borrow/loans", RequestAuthorizer, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }

    const response = await GetLoanItems(user.id);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});


export default router;