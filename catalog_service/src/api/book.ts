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
import { CreateBookRequest } from "../dto/request/CreateBookRequest";
import { BookResponse } from "../dto/response/BookResponse";
import { BookQueryRequest } from "../dto/request/BookQueryRequest";

import { BooksCountResponse } from "../dto/response/BooksCountResponse";
import { BookParams } from "../dto/request/BookParams";
import { UpdateBookRequest } from "../dto/request/UpdateBookRequest";
import { AllBookResponse } from "../dto/response/AllBookResponse";
import { Pagination } from "../dto/response/Pagination";

export const createBook = async (
    req: Request<{}, {}, CreateBookRequest>,
    res: Response<BookResponse | { message: string }>
) => {
  try {
    const data = await CreateBook(req.body);

    return res.status(201).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ message: err.message });
  }
};

export const getBooks = async (
    req: Request<{}, {}, {}, BookQueryRequest>,
    res: Response<Pagination | { message: string }>
) => {
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
};

export const getBooksCount = async (
    _req: Request,
    res: Response<BooksCountResponse | { message: string }>
) => {
  try {
    const data = await GetBooksCount();
    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
};

export const getBook = async (
    req: Request<BookParams>,
    res: Response<BookResponse | { message: string }>
) => {
  try {
    const id = parseInt(req.params.id as string, 10);

    const data = await GetBook(id);

    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(404).json({ message: err.message });
  }
};

export const updateBook = async (
    req: Request<BookParams, {}, UpdateBookRequest>,
    res: Response<BookResponse | { message: string }>
) => {
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
};

export const deleteBook = async (
    req: Request<BookParams>,
    res: Response<BookResponse | { message: string }>
) => {
  try {
    const id = parseInt(req.params.id as string, 10);

    const data = await DeleteBook(id);

    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ message: err.message });
  }
};

export const getAllBooks = async (
    _req: Request,
    res: Response<AllBookResponse[] | { message: string }>
) => {
  try {
    const data = await GetAllBooks();
    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
};

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
