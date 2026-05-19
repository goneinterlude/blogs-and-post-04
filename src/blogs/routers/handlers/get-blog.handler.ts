import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { HttpStatus } from "../../../core/types/http-statuses";
import { blogsRepository } from "../../repositories/blog.repository";
import { mapToBlogViewModel } from "../mappers/map-to-blog";

export async function getBlogHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.sendStatus(HttpStatus.NotFound);
    }

    const blog = await blogsRepository.findById(id);
    if (!blog) {
      return res.sendStatus(HttpStatus.NotFound);
    }

    const blogViewModel = mapToBlogViewModel(blog);
    res.status(HttpStatus.Ok).send(blogViewModel);
  } catch (e: unknown) {
    return res.sendStatus(HttpStatus.InternalServerError);
  }
}
