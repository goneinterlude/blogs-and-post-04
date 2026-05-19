import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postsRepository } from "../../repositories/posts.repository";
import { mapToPostViewModel } from "../mappers/map-to-post";

export async function getPostHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.sendStatus(HttpStatus.NotFound);
    }

    const post = await postsRepository.findById(id);
    if (!post) {
      return res.sendStatus(HttpStatus.NotFound);
    }
    return res.status(HttpStatus.Ok).send(mapToPostViewModel(post));
  } catch (error) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
