declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export interface User {
  id: number;
  username: string;
  role?: string;
  iat?: number;
  exp?: number;
}