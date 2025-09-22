import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import urlRouter from "./routes/urlRoutes";

import swaggerUi from "swagger-ui-express";
import swaggerJSDoc, { Options } from "swagger-jsdoc"; // <-- correct typing import
import path from "path";

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/url", urlRouter);

// Swagger config
const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: [path.join(__dirname, "./routes/*.ts")], // use absolute path
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
