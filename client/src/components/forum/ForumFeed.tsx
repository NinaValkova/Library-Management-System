import type { ForumPost } from "../../models/forum";
import CreatePost from "./CreatePost";
import ForumPostCard from "./ForumPost";

interface Props {
  posts: ForumPost[];

  onCreatePost: (
    heading: string,
    body: string
  ) => Promise<void>;

  onChanged: () => Promise<void>;
}

export default function ForumFeed({
  posts,
  onCreatePost,
  onChanged,
}: Props) {
  return (
    <div className="forum-feed">
      <CreatePost
        onCreate={onCreatePost}
      />

      {!posts.length ? (
        <div className="empty-box">
          Все още няма публикации.
        </div>
      ) : (
        posts.map((post) => (
          <ForumPostCard
            key={post.id}
            post={post}
            onChanged={onChanged}
          />
        ))
      )}
    </div>
  );
}