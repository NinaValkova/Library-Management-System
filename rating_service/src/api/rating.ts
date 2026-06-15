import express, { Request, Response, NextFunction } from "express";
import { RequestAuthorizer } from "../routes/middleware";
import {
  RateBook,
  GetMyRatingForBook,
  GetBookRatingSummary,
  ExportRatingsDataset,
} from "../service/rating.service";

const router = express.Router();

router.post(
  "/ratings/:bookId",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const bookIdParam = req.params.bookId;

      if (typeof bookIdParam !== "string") {
        return res.status(400).json({ message: "Invalid book id" });
      }

      const bookId = parseInt(bookIdParam, 10);
      const { rating } = req.body;

      if (Number.isNaN(bookId)) {
        return res.status(400).json({ message: "Invalid book id" });
      }

      const result = await RateBook(user.id, bookId, Number(rating));

      return res.status(201).json({
        message: "Rating saved successfully",
        data: result,
      });
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ message: err.message });
    }
  }
);

router.get(
  "/ratings/:bookId/me",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const bookIdParam = req.params.bookId;

      if (typeof bookIdParam !== "string") {
        return res.status(400).json({ message: "Invalid book id" });
      }

      const bookId = parseInt(bookIdParam, 10);

      if (Number.isNaN(bookId)) {
        return res.status(400).json({ message: "Invalid book id" });
      }

      const result = await GetMyRatingForBook(user.id, bookId);

      return res.status(200).json(result ?? null);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ message: err.message });
    }
  }
);

router.get(
  "/ratings/:bookId/summary",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookIdParam = req.params.bookId;

      if (typeof bookIdParam !== "string") {
        return res.status(400).json({ message: "Invalid book id" });
      }

      const bookId = parseInt(bookIdParam, 10);

      if (Number.isNaN(bookId)) {
        return res.status(400).json({ message: "Invalid book id" });
      }

      const result = await GetBookRatingSummary(bookId);

      return res.status(200).json(result);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ message: err.message });
    }
  }
);

router.get(
  "/ratings/export/all",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await ExportRatingsDataset();
      return res.status(200).json(result);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ message: err.message });
    }
  }
);

export default router;