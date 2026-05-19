import { Request, Response } from "express";
import { blogsRepository } from "../../repositories/blog.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { mapToBlogViewModel } from "../mappers/map-to-blog";
import { BlogQueryParams, BlogSortBy } from "../../types/blog-query";
import {
  PaginatedViewModel,
  SortDirection,
} from "../../../core/types/pagination";
import { BlogViewModel } from "../../types/blogViewModel";

export async function getBlogsListHandler(req: Request, res: Response) {
  try {
    const query = getBlogQueryParams(req.query);
    const { items, totalCount } = await blogsRepository.findWithPagination(
      query,
    );

    const response: PaginatedViewModel<BlogViewModel> = {
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount,
      items: items.map(mapToBlogViewModel),
    };

    res.status(HttpStatus.Ok).send(response);
  } catch (error: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}

function getBlogQueryParams(query: Request["query"]): BlogQueryParams {
  return {
    searchNameTerm: parseSearchNameTerm(query.searchNameTerm),
    sortBy: parseBlogSortBy(query.sortBy),
    sortDirection: parseSortDirection(query.sortDirection),
    pageNumber: parsePositiveInteger(query.pageNumber, 1),
    pageSize: parsePositiveInteger(query.pageSize, 10),
  };
}

function parseSearchNameTerm(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : null;
}

function parseBlogSortBy(value: unknown): BlogSortBy {
  return value === "name" || value === "createdAt" ? value : "createdAt";
}

function parseSortDirection(value: unknown): SortDirection {
  return value === "asc" || value === "desc" ? value : "desc";
}

function parsePositiveInteger(value: unknown, defaultValue: number): number {
  if (typeof value !== "string") {
    return defaultValue;
  }

  const parsedValue = Number(value);
  return Number.isInteger(parsedValue) && parsedValue > 0
    ? parsedValue
    : defaultValue;
}
