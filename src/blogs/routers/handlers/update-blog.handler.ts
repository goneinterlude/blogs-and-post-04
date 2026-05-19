import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { BlogUpdateDTO } from "../../dto/blog.input-dto";
import { HttpStatus } from "../../../core/types/http-statuses";
import { blogsRepository } from "../../repositories/blog.repository";

export async function updateBlogHandler(
  req: Request<{ id: string }, {}, BlogUpdateDTO>,
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

    const isUpdated = await blogsRepository.update(id, req.body);
    if (!isUpdated) {
      return res.sendStatus(HttpStatus.NotFound);
    }

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    return res.sendStatus(HttpStatus.InternalServerError);
  }
}
