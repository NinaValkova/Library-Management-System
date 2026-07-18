import { eq } from "drizzle-orm";
import { DB } from "../db/db.connection";
import { tokenBlocklist, TokenBlocklist, NewTokenBlocklist } from "../db/schemas";

export type TokenBlocklistRepositoryType = {
  createTokenBlocklist: (data: NewTokenBlocklist) => Promise<TokenBlocklist>;
  findByJti: (jti: string) => Promise<TokenBlocklist | undefined>;
};

const createTokenBlocklist = async ( data: NewTokenBlocklist) : Promise<TokenBlocklist> => {
  const [blockedToken] = await DB.insert(tokenBlocklist).values(data).returning();

  if (!blockedToken) {
    throw new Error("Failed to block token");
  }

  return blockedToken;
};

const findByJti = async ( jti: string ): Promise<TokenBlocklist | undefined> => {
  return DB.query.tokenBlocklist.findFirst({
    where: eq(tokenBlocklist.jti, jti),
  });
};

export const TokenBlocklistRepository: TokenBlocklistRepositoryType = {
  createTokenBlocklist,
  findByJti,
};