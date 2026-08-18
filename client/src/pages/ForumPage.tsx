import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import ForumFeed from "../components/forum/ForumFeed";
import LoadingSpinner from "../components/common/LoadingSpinner";

import useAuth from "../hooks/useAuth";
import forumService from "../services/forumService";

import type { ForumPost } from "../models/forum";

import "../styles/Forum.css";

export default function ForumPage() {
  const { auth } = useAuth();

  const [posts, setPosts] = useState<ForumPost[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadPosts = useCallback(async () => {
    try {
      setError("");

      const data =
        await forumService.getPosts();

      setPosts(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load forum"
      );
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      await loadPosts();

      setLoading(false);
    };

    load();
  }, [loadPosts]);

  const handleCreatePost = async (
    heading: string,
    body: string
  ) => {
    if (!auth.token) {
      toast.error(
        "Трябва да влезете в профила си."
      );

      return;
    }

    try {
      await forumService.createPost(
        heading,
        body,
        auth.token
      );

      toast.success(
        "Публикацията е добавена."
      );

      await loadPosts();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Create post failed"
      );
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="forum-page">
      <div className="forum-page-header">
        <h1 className="page-title">
          Форум на книгата
        </h1>
      </div>

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      {!error && (
        <ForumFeed
          posts={posts}
          onCreatePost={handleCreatePost}
          onChanged={loadPosts}
        />
      )}
    </section>
  );
}