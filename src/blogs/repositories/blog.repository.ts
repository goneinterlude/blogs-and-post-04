import { Blog } from "../types/blog";
import { blogCollection } from "../../db/mongodb";
import { Filter, ObjectId, WithId } from "mongodb";
import { BlogInputDTO } from "../dto/blog.input-dto";
import { BlogQueryParams } from "../types/blog-query";

export const blogsRepository = {
  async findWithPagination(
    query: BlogQueryParams,
  ): Promise<{ items: WithId<Blog>[]; totalCount: number }> {
    const filter: Filter<Blog> = query.searchNameTerm
      ? { name: { $regex: escapeRegExp(query.searchNameTerm), $options: "i" } }
      : {};

    const totalCount = await blogCollection.countDocuments(filter);
    const items = await blogCollection
      .find(filter)
      .sort({ [query.sortBy]: query.sortDirection === "asc" ? 1 : -1 })
      .skip((query.pageNumber - 1) * query.pageSize)
      .limit(query.pageSize)
      .toArray();

    return { items, totalCount };
  },
  async findAll(): Promise<WithId<Blog>[]> {
    return blogCollection.find().toArray();
  },
  async findById(id: string): Promise<WithId<Blog> | null> {
    return blogCollection.findOne({ _id: new ObjectId(id) }); // Если результат поиска равно null или undefined, то вернем null.
  },
  async create(newBlog: Blog): Promise<WithId<Blog>> {
    const insertResult = await blogCollection.insertOne(newBlog);
    return { ...newBlog, _id: insertResult.insertedId };
  },
  async update(id: string, dto: BlogInputDTO): Promise<boolean> {
    const updateResult = await blogCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: dto.name,
          description: dto.description,
          websiteUrl: dto.websiteUrl,
        },
      },
    );
    return updateResult.matchedCount === 1;
  },
  async delete(id: string): Promise<boolean> {
    const deleteResult = await blogCollection.deleteOne({
      _id: new ObjectId(id),
    });
    return deleteResult.deletedCount === 1;
  },
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
