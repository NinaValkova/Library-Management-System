import { Request, Response } from "express";

import {
  BorrowBook,
  ReturnBook,
  GetCurrentBorrows,
  GetBorrowHistory,
  GetLoanItems,
  GetActiveBorrowsCount,
} from "../service/borrow.service";

import { BorrowBookParams } from "../dto/request/BorrowBookParams";
import { ReturnBookParams } from "../dto/request/ReturnBookRequest";

import { BorrowBookResponse } from "../dto/response/BorrowBookResponse";
import { ReturnBookResponse } from "../dto/response/ReturnBookResponse";
import { ActiveBorrowsCountResponse } from "../dto/response/ActiveBorrowsCountResponse";


export const borrowBook = async (
  req: Request<BorrowBookParams, any, {}>,
  res: Response<BorrowBookResponse | { message: string }>
) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const bookId = parseInt(req.params.bookId, 10);

    if (Number.isNaN(bookId)) {
      return res.status(400).json({
        message: "Invalid book id",
      });
    }

    const response = await BorrowBook(user.id, bookId);

    return res.status(200).json(response);
  } catch (error) {
    const err = error as Error;

    return res.status(400).json({
      message: err.message,
    });
  }
};


export const returnBook = async (
  req: Request<ReturnBookParams, any, {}>,
  res: Response<ReturnBookResponse | { message: string }>
) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const bookId = parseInt(req.params.bookId, 10);

    if (Number.isNaN(bookId)) {
      return res.status(400).json({
        message: "Invalid book id",
      });
    }

    const response = await ReturnBook(user.id, bookId);

    return res.status(200).json(response);
  } catch (error) {
    const err = error as Error;

    return res.status(400).json({
      message: err.message,
    });
  }
};


export const getActiveBorrowsCount = async (
  _req: Request,
  res: Response<ActiveBorrowsCountResponse | { message: string }>
) => {
  try {
    const response = await GetActiveBorrowsCount();

    return res.status(200).json(response);
  } catch (error) {
    const err = error as Error;

    return res.status(500).json({
      message: err.message,
    });
  }
};


export const getCurrentBorrows = async (
  req: Request,
  res: Response
) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const response = await GetCurrentBorrows(user.id);

    return res.status(200).json(response);
  } catch (error) {
    const err = error as Error;

    return res.status(500).json({
      message: err.message,
    });
  }
};


export const getBorrowHistory = async (
  req: Request,
  res: Response
) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const response = await GetBorrowHistory(user.id);

    return res.status(200).json(response);
  } catch (error) {
    const err = error as Error;

    return res.status(500).json({
      message: err.message,
    });
  }
};


export const getLoanItems = async (
  req: Request,
  res: Response
) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const response = await GetLoanItems(user.id);

    return res.status(200).json(response);
  } catch (error) {
    const err = error as Error;

    return res.status(500).json({
      message: err.message,
    });
  }
};