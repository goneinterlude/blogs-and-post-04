import { Request, Response } from "express";
import { postsRepository } from "../../repositories/posts.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { mapToPostViewModel } from "../mappers/map-to-post";

export async function getPostsListHandler(req: Request, res: Response) {
  try {
    const posts = await postsRepository.findAll();
    const postsViewModel = posts.map(mapToPostViewModel);

    res.status(HttpStatus.Ok).send(postsViewModel);
  } catch (error) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
