import { BORROW_SERVICE_URL } from "../constants/url";
import type { BorrowRecord } from "../models/borrow";
import { apiRequest } from "../api/apiRequest";

const borrowService = {
  async borrowBook(bookId: number, token: string): Promise<BorrowRecord> {
    return apiRequest<BorrowRecord>(`${BORROW_SERVICE_URL}/borrow/${bookId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });
  },

  async returnBook(bookId: number, token: string): Promise<BorrowRecord> {
    return apiRequest<BorrowRecord>(`${BORROW_SERVICE_URL}/return/${bookId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });
  },

  async getCurrentBorrows(token: string): Promise<BorrowRecord[]> {
    return apiRequest<BorrowRecord[]>(`${BORROW_SERVICE_URL}/borrow/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async getBorrowHistory(token: string): Promise<BorrowRecord[]> {
    return apiRequest<BorrowRecord[]>(`${BORROW_SERVICE_URL}/borrow/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async getLoanItems(token: string): Promise<BorrowRecord[]> {
    return apiRequest<BorrowRecord[]>(`${BORROW_SERVICE_URL}/borrow/loans`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async getActiveBorrowsCount(): Promise<{ activeBorrows: number }> {
  return apiRequest<{ activeBorrows: number }>(
    `${BORROW_SERVICE_URL}/borrow/active-count`
  );
},
};

export default borrowService;