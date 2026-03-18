import { WithId } from "mongodb";
import { PostViewModel } from "../../types/postViewModel";
import { PostDbModel } from "../../types/post-db-model";

export function mapToPostViewModel(post: WithId<PostDbModel>): PostViewModel {
  return {
    id: post._id.toString(),
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId,
    blogName: post.blogName,
    createdAt: post.createdAt,
  };
}
