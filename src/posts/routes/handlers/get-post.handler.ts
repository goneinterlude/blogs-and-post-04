import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/utils/error.utils";
import { postsRepository } from "../../repositories/posts.repository";

export async function getPostHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;
    const post = await postsRepository.findById(id);
    if (!post) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }
    return res.status(HttpStatus.Ok).send(post);
  } catch (error) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
