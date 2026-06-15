import { Static, Type } from "@sinclair/typebox";

export const BorrowRequestSchema = Type.Object({
  bookId: Type.Integer(),
});

export type BorrowRequestInput = Static<typeof BorrowRequestSchema>;

export const ReturnRequestSchema = Type.Object({
  bookId: Type.Integer(),
});

export type ReturnRequestInput = Static<typeof ReturnRequestSchema>;