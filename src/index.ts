import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import { setupApp } from "./setup-app";
import { SETTINGS } from "./core/settings/settings";
import { runDB } from "./db/mongodb";

const app = express();
const dbConnectionPromise = runDB(SETTINGS.MONGO_URL);

app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    await dbConnectionPromise;
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.sendStatus(500);
  }
});

setupApp(app);

if (!process.env.VERCEL) {
  dbConnectionPromise
    .then(() => {
      app.listen(SETTINGS.PORT, () => {
        console.log(`Example app listening on port ${SETTINGS.PORT}`);
      });
    })
    .catch((err) => {
      console.error("App crashed:", err);
      process.exit(1);
    });
}

export default app;
