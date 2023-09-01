import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config";
import errorHandler from "./middleware/errorHandler";
import fourOhFour from "./middleware/fourOhFour";
import root from "./routes/root";
import dbInit from "./databases/init";
import auth from "./routes/auth";
import owner from "./routes/owner";
import admin from "./routes/admin";

const app = express();

// Apply most middleware first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: config.clientOrigins[config.nodeEnv],
  })
);

if (config.nodeEnv !== "test") {
  dbInit();
}

app.use(helmet());
app.use(morgan("tiny"));

// Apply routes before error handling
app.use("/", root);
app.use("/owner", owner);
app.use("/auth", auth);
app.use("/admin", admin);

// Apply error handling last
app.use(fourOhFour);
app.use(errorHandler);

export default app;
