"use client";

import dynamic from "next/dynamic";
import type { Types } from "@/types";
import { startTransition, useState } from "react";

import Loading from "@ui/loading";
import CommentCreateForm from "@/components/comment-create-form";
import { CommentDeleteModal } from "@/components/comment-delete-modal";
import { CommentDeleteModalProvider } from "@/components/comment-delete-modal";

import { deleteCommentAction } from "@/actions";
import { COMMENTS_CONTEXT } from "@/context/comments";
import { useOptimisticComments } from "@/hooks/useOptimisticComments";

const Comments = dynamic(() => import("@/components/comments"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-[999] grid place-items-center bg-white">
      <Loading />
    </div>
  ),
});

function CommentsSection({ comments }: Types.CommentsProps) {
  // Optimistic comments state
  const [optimisticComments, addOptimisticComments] =
    useOptimisticComments(comments);

  const [deleteComment, setDeleteComment] = useState<{
    id: string;
    parentId?: string;
  } | null>(null);

  // Comment delete handler function
  async function handleCommentDelete() {
    if (deleteComment === null) return;

    const { id, parentId } = deleteComment;
    startTransition(() => {
      const action: Types.CommentsAction =
        parentId === undefined
          ? { type: "comment/delete", payload: id }
          : { type: "reply/delete", payload: { id, parentId } };
      addOptimisticComments(action);
      setDeleteComment(null);
    });
    // Invoke the server action to delete a comment
    await deleteCommentAction(id);
  }

  // Re-assign the context value
  COMMENTS_CONTEXT.addOptimisticComments = addOptimisticComments;
  COMMENTS_CONTEXT.onSelectCommentToDelete = (
    id: string,
    parentId?: string
  ) => {
    setDeleteComment({ id, parentId });
  };

  return (
    <CommentDeleteModalProvider>
      {/* Display all comments */}
      <Comments comments={optimisticComments} />

      {/* Submit new comment form */}
      <CommentCreateForm />

      {/* Comment delete modal */}
      <CommentDeleteModal
        onCancel={() => setDeleteComment(null)}
        onConfirm={handleCommentDelete}
      />
    </CommentDeleteModalProvider>
  );
}

export default CommentsSection;
