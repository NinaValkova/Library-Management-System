import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import ForumPost from "../components/forum/ForumPost";
import LoadingSpinner from "../components/common/LoadingSpinner";

import forumService from "../services/forumService";

import type { ForumPost as ForumPostModel } from "../models/forum";

import "../styles/Forum.css";

export default function ForumPostPage() {
  const { postId } = useParams<{
    postId: string;
  }>();

  const navigate = useNavigate();

  const [post, setPost] =
    useState<ForumPostModel | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadPost = useCallback(async () => {
    if (!postId) {
      setError(
        "Невалиден идентификатор на публикацията."
      );

      return;
    }

    try {
      setError("");

      const data =
        await forumService.getPost(postId);

      setPost(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load post"
      );
    }
  }, [postId]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      await loadPost();

      setLoading(false);
    };

    load();
  }, [loadPost]);

  const handleChanged = async () => {
    if (!postId) {
      return;
    }

    try {
      const updatedPost =
        await forumService.getPost(postId);

      setPost(updatedPost);
    } catch {
      navigate("/forum");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <section className="forum-page">
        <div className="error-box">
          {error}
        </div>

        <Link
          to="/forum"
          className="btn btn-outline"
        >
          Назад към форума
        </Link>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="forum-page">
        <div className="empty-box">
          Публикацията не е намерена.
        </div>

        <Link
          to="/forum"
          className="btn btn-outline"
        >
          Назад към форума
        </Link>
      </section>
    );
  }

  return (
    <section className="forum-page">
      <ForumPost
        post={post}
        onChanged={handleChanged}
      />
    </section>
  );
}