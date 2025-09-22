import { Router } from "express";
import { shortenUrl, redirectUrl } from "../controllers/urlController";

const router = Router();

/**
 * @openapi
 * /api/url/shorten:
 *   post:
 *     summary: Create a shortened URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - originalUrl
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 example: "https://www.google.com"
 *     responses:
 *       201:
 *         description: Short URL created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortId:
 *                   type: string
 *                   example: "abc123"
 *                 originalUrl:
 *                   type: string
 *                   example: "https://www.google.com"
 *       400:
 *         description: Invalid URL
 */
router.post("/shorten", shortenUrl);

/**
 * @openapi
 * /api/url/{shortId}:
 *   get:
 *     summary: Redirect to the original URL
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         schema:
 *           type: string
 *         description: The short ID of the URL
 *     responses:
 *       302:
 *         description: Redirects to the original URL
 *       404:
 *         description: Short URL not found
 */
router.get("/:shortId", redirectUrl);

export default router;
