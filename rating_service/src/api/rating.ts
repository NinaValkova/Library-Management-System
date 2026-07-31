import { Request, Response } from "express";

import {
  RateBook,
  GetMyRatingForBook,
  GetBookRatingSummary,
  ExportRatingsDataset,
} from "../service/rating.service";

import { RatingBookParams } from "../dto/request/RatingBookParams";

import { RatingResponse } from "../dto/response/RatingResponse";
import { RateBookResponse } from "../dto/response/RateBookResponse";
import { BookRatingSummaryResponse } from "../dto/response/BookRatingSummaryResponse";
import { RatingDatasetResponse } from "../dto/response/RatingDatasetResponse";
import { RatingRequest } from "../dto/request/RatingRequest.dto";

export const rateBook = async (
  req: Request<RatingBookParams, any, RatingRequest>,
  res: Response<RateBookResponse | { message: string }>
) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const bookId = parseInt(req.params.bookId, 10);

    if (Number.isNaN(bookId)) {
      return res.status(400).json({
        message: "Invalid book id",
      });
    }

    const { rating } = req.body;

    if (
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return res.status(400).json({
        message: "Rating must be an integer between 1 and 5",
      });
    }

    const result = await RateBook(
      user.id,
      bookId,
      rating
    );

    return res.status(201).json({
      message: "Rating saved successfully",
      data: result,
    });
  } catch (error) {
    const err = error as Error;

    return res.status(400).json({
      message: err.message,
    });
  }
};

export const getMyRatingForBook = async (
  req: Request<RatingBookParams>,
  res: Response<
    RatingResponse | null | { message: string }
  >
) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const bookId = parseInt(req.params.bookId, 10);

    if (Number.isNaN(bookId)) {
      return res.status(400).json({
        message: "Invalid book id",
      });
    }

    const result = await GetMyRatingForBook(
      user.id,
      bookId
    );

    return res.status(200).json(result ?? null);
  } catch (error) {
    const err = error as Error;

    return res.status(400).json({
      message: err.message,
    });
  }
};

export const getBookRatingSummary = async (
  req: Request<RatingBookParams>,
  res: Response<
    BookRatingSummaryResponse | { message: string }
  >
) => {
  try {
    const bookId = parseInt(req.params.bookId, 10);

    if (Number.isNaN(bookId)) {
      return res.status(400).json({
        message: "Invalid book id",
      });
    }

    const result = await GetBookRatingSummary(bookId);

    return res.status(200).json(result);
  } catch (error) {
    const err = error as Error;

    return res.status(400).json({
      message: err.message,
    });
  }
};

export const exportRatingsDataset = async (
  _req: Request,
  res: Response<
    RatingDatasetResponse[] | { message: string }
  >
) => {
  try {
    const result = await ExportRatingsDataset();

    return res.status(200).json(result);
  } catch (error) {
    const err = error as Error;

    return res.status(500).json({
      message: err.message,
    });
  }
};