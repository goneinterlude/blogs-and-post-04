import { Router, Request, Response } from "express";
import { HttpStatus } from "../core/types/http-statuses";
import { testingRepository } from "./testing-repository/testing.repository";

export const testingRouter = Router({});

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
  await testingRepository.deleteAllData();
  res.sendStatus(HttpStatus.NoContent);
});
