import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/utils/error.utils";
import { blogsRepository } from "../../repositories/blog.repository";

export async function deleteBlogHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;
    const blog = await blogsRepository.findById(id);

    if (!blog) {
      res.sendStatus(HttpStatus.NotFound);

      return;
    }

    await blogsRepository.delete(id);
    return res.sendStatus(HttpStatus.NoContent);
  } catch (e) {
    return res.sendStatus(HttpStatus.InternalServerError);
  }
}
