import { Request, Response } from "express";
import { createShortUrl, getOriginalUrl } from "../services/urlService";

export async function shortenUrl(req: Request, res: Response) {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) return res.status(400).json({ error: "URL is required" });

    const shortId = await createShortUrl(originalUrl);
    return res.json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}

export async function redirectUrl(req: Request, res: Response) {
  try {
    const { shortId } = req.params;
    const originalUrl = await getOriginalUrl(shortId);

    if (!originalUrl) return res.status(404).json({ error: "URL not found" });

    return res.redirect(originalUrl);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
