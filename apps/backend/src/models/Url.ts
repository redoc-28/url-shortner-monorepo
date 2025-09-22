import mongoose, { Schema, Document } from "mongoose";

export interface IUrl extends Document {
  originalUrl: string;
  shortId: string;
  clicks: number;
}

const UrlSchema = new Schema<IUrl>(
  {
    originalUrl: { type: String, required: true },
    shortId: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IUrl>("Url", UrlSchema);
