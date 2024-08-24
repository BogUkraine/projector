import { Document } from "mongoose";

export interface IMessage extends Document {
  readonly _id: string;
  readonly text: string;
}
