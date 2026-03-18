import { Request, Response} from "express";
import { BlogInputDTO} from "../../dto/blog.input-dto";
import { HttpStatus } from "../../../core/types/http-statuses";
import { Blog} from "../../types/blog";
import {blogsRepository} from "../../repositories/blog.repository";
import {mapToBlogViewModel} from "../mappers/map-to-blog";

export async function createBlogHandler(
    req: Request<{}, {}, BlogInputDTO>,
    res: Response,) {

    try {
        const newBlog: Blog = {
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        const createdBlog = await blogsRepository.create(newBlog)
        const blogViewModel = mapToBlogViewModel(createdBlog)
        res.status(HttpStatus.Created).send(blogViewModel);
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError);
    }


}