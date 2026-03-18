import { Request, Response } from "express";
import { postsRepository } from "../../repositories/posts.repository";
import { HttpStatus } from "../../../core/types/http-statuses";

export async function getPostsListHandler(req: Request, res: Response) {
  try {
    const posts = await postsRepository.findAll();
    res.status(HttpStatus.Ok).send(posts);
  } catch (error) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
