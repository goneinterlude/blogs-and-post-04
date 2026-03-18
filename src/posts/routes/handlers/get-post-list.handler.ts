import { Request, Response } from "express";
import { postsRepository } from "../../repositories/posts.repository";
import { HttpStatus } from "../../../core/types/http-statuses";

export async function getPostsListHandler(req: Request, res: Response) {
  try {
    const blogs = await postsRepository.findAll();
    res.send(blogs);
  } catch (error) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
