import { Router } from "express";

import {
  rateBook,
  getMyRatingForBook,
  getBookRatingSummary,
  exportRatingsDataset,
} from "../api/rating";

import { RequestAuthorizer } from "../middleware/authorizer";

const ratingRouter = Router();

ratingRouter.post(
  "/ratings/:bookId",
  RequestAuthorizer,
  rateBook
);

ratingRouter.get(
  "/ratings/:bookId/me",
  RequestAuthorizer,
  getMyRatingForBook
);

ratingRouter.get(
  "/ratings/:bookId/summary",
  getBookRatingSummary
);

ratingRouter.get(
  "/ratings/export/all",
  exportRatingsDataset
);

export default ratingRouter;