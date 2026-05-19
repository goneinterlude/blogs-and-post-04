import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postsRepository } from "../../repositories/posts.repository";

export async function deletePostHandler(
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

    await postsRepository.delete(id);
    res.sendStatus(HttpStatus.NoContent);
  } catch (err) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
