import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import ForumFeed from "../components/forum/ForumFeed";
import PollFeed from "../components/forum/PollFeed";

import CreatePostModal from "../components/forum/CreatePostModal";
import CreatePollModal from "../components/forum/CreatePollModal";

import LoadingSpinner from "../components/common/LoadingSpinner";

import useAuth from "../hooks/useAuth";
import forumService from "../services/forumService";

import type { ForumPost } from "../models/forum";
import type { Poll } from "../models/poll";

import "../styles/Forum.css";

export default function ForumPage() {
  const { auth } = useAuth();

  const [posts, setPosts] =
    useState<ForumPost[]>([]);

  const [polls, setPolls] =
    useState<Poll[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [
    isCreatePostOpen,
    setIsCreatePostOpen,
  ] = useState(false);

  const [
    isCreatePollOpen,
    setIsCreatePollOpen,
  ] = useState(false);

  // Admin check
  const isAdmin =
    auth.user?.role?.toLowerCase() ===
    "admin";

  // Temporary debugging
  console.log("AUTH USER:", auth.user);
  console.log("ROLE:", auth.user?.role);
  console.log("IS ADMIN:", isAdmin);

  const loadForum =
    useCallback(async () => {
      try {
        setError("");

        const [
          postsData,
          pollsData,
        ] = await Promise.all([
          forumService.getPosts(),
          forumService.getPolls(),
        ]);

        setPosts(postsData);
        setPolls(pollsData);
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

      await loadForum();

      setLoading(false);
    };

    load();
  }, [loadForum]);

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

      setIsCreatePostOpen(false);

      await loadForum();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Create post failed"
      );

      throw err;
    }
  };

  const handleCreatePoll = async (
    question: string,
    options: string[]
  ) => {
    if (!auth.token) {
      toast.error(
        "Трябва да влезете в профила си."
      );

      return;
    }

    if (!isAdmin) {
      toast.error(
        "Само администратор може да създава анкети."
      );

      return;
    }

    try {
      await forumService.createPoll(
        question,
        options,
        auth.token
      );

      toast.success(
        "Анкетата е добавена."
      );

      setIsCreatePollOpen(false);

      await loadForum();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Create poll failed"
      );

      throw err;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="forum-page">

      {/* CREATE MENU */}

      <div className="forum-create-menu">

        {/* Every authenticated forum user */}

        <button
          type="button"
          className="forum-create-type-button"
          onClick={() =>
            setIsCreatePostOpen(true)
          }
        >
          <i className="bi bi-pencil-square" />

          <span>
            Добави публикация
          </span>
        </button>

        {/* ADMIN ONLY */}

        {isAdmin && (
          <button
            type="button"
            className="forum-create-type-button"
            onClick={() =>
              setIsCreatePollOpen(true)
            }
          >
            <i className="bi bi-bar-chart-fill" />

            <span>
              Създай анкета
            </span>
          </button>
        )}

      </div>

      <hr className="forum-menu-divider" />

      <div className="forum-page-header">
        <h1 className="page-title">
          📖 Форум на книгата
        </h1>
      </div>

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      {!error && (
        <>
          <PollFeed
            polls={polls}
            onChanged={loadForum}
          />

          <ForumFeed
            posts={posts}
            onChanged={loadForum}
          />
        </>
      )}

      <CreatePostModal
        open={isCreatePostOpen}
        onClose={() =>
          setIsCreatePostOpen(false)
        }
        onCreate={handleCreatePost}
      />

      {/* ADMIN ONLY */}

      {isAdmin && (
        <CreatePollModal
          open={isCreatePollOpen}
          onClose={() =>
            setIsCreatePollOpen(false)
          }
          onCreate={handleCreatePoll}
        />
      )}

    </section>
  );
}