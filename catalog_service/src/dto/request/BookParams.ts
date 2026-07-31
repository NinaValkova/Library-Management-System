import { ParamsDictionary } from "express-serve-static-core";

export interface BookParams extends ParamsDictionary {
  id: string;
}