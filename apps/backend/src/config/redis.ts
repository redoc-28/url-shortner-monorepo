import { createClient } from "redis";

let redisClient: ReturnType<typeof createClient>;

export default async function connectRedis() {
  redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
  });

  redisClient.on("error", (err) => console.error("❌ Redis Client Error", err));

  await redisClient.connect();
  console.log("✅ Redis Connected");
}

export { redisClient };
