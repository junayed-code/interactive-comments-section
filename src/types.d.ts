import type { Prisma } from "@prisma/client";
import { getComments } from "@lib/db/comments";

export type { Prisma };

export namespace Types {
  type CommentReplies = Prisma.CommentGetPayload<{
    select: {
      replies: {
        select: {
          id: true;
          content: true;
          score: true;
          parentId: true;
          createdAt: true;
          user: true;
          replyTo: true;
        };
      };
    };
  }>["replies"];

  type Comment = Prisma.CommentGetPayload<{
    select: {
      id: true;
      content: true;
      score: true;
      createdAt: true;
      user: true;
      replyTo: true;
      parentId: true;
    };
  }> & {
    replies?: CommentReplies;
  };

  type CommentsProps = {
    comments: Comment[];
  };

  type CommentsAction =
    | {
        type: "comment/add";
        payload: Comment;
      }
    | {
        type: "reply/add";
        payload: CommentReplies[number];
      }
    | { type: "comment/update"; payload: { id: string; content: string } }
    | {
        type: "reply/update";
        payload: { id: string; parentId: string; content: string };
      }
    | { type: "comment/delete"; payload: string }
    | { type: "reply/delete"; payload: { id: string; parentId: string } };

  type CommentDeleteModalProps = {
    onCancel?: () => void;
    onConfirm?: () => void;
  };

  type CommentProps = {
    comment: Comment;
  };

  type CommentActionButtonsProps = {
    isLoggedInUser: boolean;
    onReply(): void;
    onEdit(): void;
    onDelete(): void;
    className?: string;
  };

  type CommentRepliesProps = {
    replies: CommentReplies;
  };

  type CommentState = "default" | "edit" | "reply";

  type CommentEditFormProps = {
    className?: string;
    comment: Comment;
    onAction?(): void;
  };

  type CommentReplyFormProps = CommentEditFormProps;

  type CommentsContextValue = {
    onSelectCommentToDelete(id: string, parentId?: string): void;
    addOptimisticComments(action: Types.CommentsAction): void;
  };
}
