import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { HttpStatus } from "../../../core/types/http-statuses";
import { blogsRepository } from "../../repositories/blog.repository";

export async function deleteBlogHandler(
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

    const isDeleted = await blogsRepository.delete(id);
    if (!isDeleted) {
      return res.sendStatus(HttpStatus.NotFound);
    }
    return res.sendStatus(HttpStatus.NoContent);
  } catch (e) {
    return res.sendStatus(HttpStatus.InternalServerError);
  }
}
