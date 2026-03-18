import { Request, Response } from "express";
import { PostInputDTO, PostUpdateDTO } from "../../dto/posts-input.dto";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postsRepository } from "../../repositories/posts.repository";
import { blogsRepository } from "../../../blogs/repositories/blog.repository";
import { createErrorMessages } from "../../../core/utils/error.utils";

export async function updatePostHandler(
  req: Request<{ id: string }, {}, PostUpdateDTO>,
  res: Response,
) {
  try {
    const postId = req.params.id;
    const blogId = req.body.blogId; // number
    const blog = await blogsRepository.findById(blogId);

    if (!blog) {
      return res
        .status(HttpStatus.BadRequest)
        .send(
          createErrorMessages([{ message: "Blog not found", field: "blogId" }]),
        );
    }

    const updated = await postsRepository.update(postId, req.body, blog.name);

    if (!updated) {
      return res.sendStatus(HttpStatus.NotFound);
    }
    return res.sendStatus(HttpStatus.NoContent); // 204
  } catch (error) {
    return res.status(HttpStatus.InternalServerError).send();
  }
}
