import Url from "../models/Url";
import { redisClient } from "../config/redis";
import { generateSlug } from "../utils/slugGenerator";

export async function createShortUrl(originalUrl: string) {
  // Check cache
  const cached = await redisClient.get(originalUrl);
  if (cached) return cached;

  // Check DB
  let existing = await Url.findOne({ originalUrl });
  if (existing) return existing.shortId;

  // Generate new
  const shortId = generateSlug();
  const newUrl = await Url.create({ originalUrl, shortId });

  // Save in cache
  await redisClient.set(originalUrl, shortId);

  return newUrl.shortId;
}

export async function getOriginalUrl(shortId: string) {
  // Check cache
  const cached = await redisClient.get(shortId);
  if (cached) return cached;

  const url = await Url.findOne({ shortId });
  if (!url) return null;

  url.clicks++;
  await url.save();

  // Save in cache
  await redisClient.set(shortId, url.originalUrl);

  return url.originalUrl;
}
