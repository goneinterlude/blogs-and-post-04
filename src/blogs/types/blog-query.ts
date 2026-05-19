import { SortDirection } from "../../core/types/pagination";

export type BlogSortBy = "createdAt" | "name";

export type BlogQueryParams = {
  searchNameTerm: string | null;
  sortBy: BlogSortBy;
  sortDirection: SortDirection;
  pageNumber: number;
  pageSize: number;
};
