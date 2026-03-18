import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/utils/error.utils";
import { postsRepository } from "../../repositories/posts.repository";
import { mapToPostViewModel } from "../mappers/map-to-post";

export async function getPostHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;
    const post = await postsRepository.findById(id);
    if (!post) {
      return res.sendStatus(HttpStatus.NotFound);
    }
    return res.status(HttpStatus.Ok).send(mapToPostViewModel(post));
  } catch (error) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
