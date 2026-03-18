import { Request, Response } from "express";
import { BlogUpdateDTO } from "../../dto/blog.input-dto";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/utils/error.utils";
import { blogsRepository } from "../../repositories/blog.repository";
import { mapToBlogViewModel } from "../mappers/map-to-blog";

export async function updateBlogHandler(
  req: Request<{ id: string }, {}, BlogUpdateDTO>,
  res: Response,
) {
  try {
    const id = req.params.id;
    const blog = blogsRepository.findById(id);

    if (!blog) {
      res.sendStatus(HttpStatus.NotFound);

      return;
    }
    await blogsRepository.update(id, req.body);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.status(HttpStatus.InternalServerError).send();
  }
}
