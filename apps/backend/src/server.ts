import app from "./app";
import connectDB from "./config/db";
import connectRedis from "./config/redis";

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  await connectRedis();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(
      `📖 Swagger docs available at http://localhost:${PORT}/api-docs`
    );
  });
}

startServer().catch((err) => {
  console.error("❌ Failed to start server", err);
});
