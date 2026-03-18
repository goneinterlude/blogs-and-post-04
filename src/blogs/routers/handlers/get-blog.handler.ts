import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/utils/error.utils";
import { blogsRepository } from "../../repositories/blog.repository";
import { mapToBlogViewModel } from "../mappers/map-to-blog";

export async function getBlogHandler(
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

    const blogViewModel = mapToBlogViewModel(blog);
    res.status(HttpStatus.Ok).send(blogViewModel);
  } catch (e: unknown) {
    res.status(HttpStatus.InternalServerError).send();
  }
}
