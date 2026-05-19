import { PostUpdateDTO } from "../dto/posts-input.dto";
import { postCollection } from "../../db/mongodb";
import { ObjectId, WithId } from "mongodb";
import { PostDbModel } from "../types/post-db-model";
import { PostQueryParams } from "../types/post-query";

export const postsRepository = {
  async findWithPagination(
    query: PostQueryParams,
  ): Promise<{ items: WithId<PostDbModel>[]; totalCount: number }> {
    const totalCount = await postCollection.countDocuments({});
    const items = await postCollection
      .find()
      .sort({ [query.sortBy]: query.sortDirection === "asc" ? 1 : -1 })
      .skip((query.pageNumber - 1) * query.pageSize)
      .limit(query.pageSize)
      .toArray();

    return { items, totalCount };
  },
  async findByBlogIdWithPagination(
    blogId: string,
    query: PostQueryParams,
  ): Promise<{ items: WithId<PostDbModel>[]; totalCount: number }> {
    const filter = { blogId };
    const totalCount = await postCollection.countDocuments(filter);
    const items = await postCollection
      .find(filter)
      .sort({ [query.sortBy]: query.sortDirection === "asc" ? 1 : -1 })
      .skip((query.pageNumber - 1) * query.pageSize)
      .limit(query.pageSize)
      .toArray();

    return { items, totalCount };
  },
  async findAll(): Promise<WithId<PostDbModel>[]> {
    return postCollection.find().toArray();
  },
  async findById(id: string): Promise<WithId<PostDbModel> | null> {
    return postCollection.findOne({ _id: new ObjectId(id) }); // Если результат поиска равно null или undefined, то вернем null.
  },
  async create(newPost: PostDbModel): Promise<WithId<PostDbModel>> {
    const insertResult = await postCollection.insertOne(newPost);
    return { ...newPost, _id: insertResult.insertedId };
  },
  async update(
    id: string,
    dto: PostUpdateDTO,
    blogName: string,
  ): Promise<boolean> {
    const updateResult = await postCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: dto.title,
          shortDescription: dto.shortDescription,
          content: dto.content,
          blogId: dto.blogId,
          blogName: blogName,
        },
      },
    );
    return updateResult.matchedCount === 1;
  },
  async delete(id: string): Promise<void> {
    const deleteResult = await postCollection.deleteOne({
      _id: new ObjectId(id),
    });
    if (deleteResult.deletedCount < 1) {
      throw new Error("Post not exist");
    }
    return;
  },
};
