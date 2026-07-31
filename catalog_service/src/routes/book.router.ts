import { Router } from "express";
import {
    createBook,
    updateBook,
    deleteBook,
    getBook,
    getBooks,
    getBooksCount,
    getAllBooks,
} from "../api/book";

const bookRouter = Router();

bookRouter.post("/books", createBook);
bookRouter.get("/books", getBooks);
bookRouter.get("/books/count", getBooksCount);
bookRouter.get("/books/:id", getBook);
bookRouter.patch("/books/:id", updateBook);
bookRouter.delete("/books/:id", deleteBook);
bookRouter.get("/books/export/all", getAllBooks);

export default bookRouter;