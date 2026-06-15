import express, { Request, Response } from "express";
import {
  CreateBook,
  UpdateBook,
  DeleteBook,
  GetBook,
  GetBooks,
  GetBooksCount,
  GetAllBooks,
  // BorrowBook,
  // ReturnBook,
} from "../service/book.service";
import { BookQueryParams } from "../types/book.query.params";

const router = express.Router();

router.post("/books", async (req: Request, res: Response) => {
  try {
    const data = await CreateBook(req.body);

    return res.status(201).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ message: err.message });
  }
});

router.get("/books", async (req: Request, res: Response) => {
  try {
    const params: BookQueryParams = {
      pageIndex: Number(req.query.pageIndex) || 1,
      pageSize: Number(req.query.pageSize) || 6,
      search: req.query.search as string,
      category: req.query.category as string,
      language: req.query.language as string,
      isBorrowed: req.query.isBorrowed as string,
      sort: req.query.sort as string,
    };

    const data = await GetBooks(params);

    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
});

router.get("/books/count", async (req: Request, res: Response) => {
  try {
    const data = await GetBooksCount();
    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
});

router.get("/books/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);

    const data = await GetBook(id);

    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(404).json({ message: err.message });
  }
});

router.patch("/books/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);

    const data = await UpdateBook({
      id,
      ...req.body,
    });

    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ message: err.message });
  }
});

router.delete("/books/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);

    const data = await DeleteBook(id);

    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ message: err.message });
  }
});

router.get("/books/export/all", async (_req: Request, res: Response) => {
  try {
    const data = await GetAllBooks();
    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
});

/*

//synchronous app
router.post("/books/:id/borrow", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { userId } = req.body;

    const data = await BorrowBook(id, Number(userId));

    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ message: err.message });
  }
});

//synchronous app
router.post("/books/:id/return", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { userId } = req.body;

    const data = await ReturnBook(id, Number(userId));

    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ message: err.message });
  }
});

*/

export default router;