import type { ForumPost } from "../../models/forum";
import ForumPostCard from "./ForumPost";

interface Props {
  posts: ForumPost[];
  onChanged: () => Promise<void>;
}

export default function ForumFeed({
  posts,
  onChanged,
}: Props) {
  if (posts.length === 0) {
    return (
      <div className="empty-box">
        Все още няма публикации.
      </div>
    );
  }

  return (
    <div className="forum-feed">
      {posts.map((post) => (
        <ForumPostCard
          key={post.id}
          post={post}
          onChanged={onChanged}
        />
      ))}
    </div>
  );
}