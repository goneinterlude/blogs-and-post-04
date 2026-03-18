import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/utils/error.utils";
import { postsRepository } from "../../repositories/posts.repository";

export async function deletePostHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  const id = req.params.id;
  const post = await postsRepository.findById(id);
  try {
    if (!post) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: "id", message: "Post not found" }]),
        );
      return;
    }
    await postsRepository.delete(id);
    res.sendStatus(HttpStatus.NoContent);
  } catch (err) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
