import { Request, Response } from "express";
import { blogsRepository } from "../../repositories/blog.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { mapToBlogViewModel } from "../mappers/map-to-blog";

export async function getBlogsListHandler(req: Request, res: Response) {
  try {
    const blogs = await blogsRepository.findAll();
    const blogViewModel = blogs.map(mapToBlogViewModel);
    res.send(blogViewModel);
  } catch (error: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
