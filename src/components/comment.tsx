"use client";

import type { Types } from "@/types";
import React, { memo, useMemo, useState } from "react";

import Button from "@ui/button";
import Avatar from "@ui/avatar";
import { ModalOpenButton } from "@ui/modal";
import { ReplyIcon, DeleteIcon, EditIcon } from "@ui/icons";

import Counter from "@/components/counter";
import CommentEditForm from "@/components/comment-edit-form";
import CommentReplyForm from "@/components/comment-reply-form";

import cn from "@/utils/cn";
import timeDiff from "@/utils/time-diff";
import { USER } from "@/app.config";
import { updateCommentScoreAction } from "@/actions";
import { COMMENTS_CONTEXT } from "@/context/comments";
import toggleCallbackWrapper from "@/utils/toggle-callback-wrapper";

function Comment({ comment }: Types.CommentProps) {
  const { id, content, user, score, replyTo, parentId, replies } = comment;
  const createdAt = useMemo(() => timeDiff(comment.createdAt), [comment]);
  const isLoggedInUser = USER.id === user.id;

  const [state, setState] = useState<Types.CommentState>("default");
  const { onSelectCommentToDelete } = COMMENTS_CONTEXT;

  // Memorize callbacks on re-renders
  /* eslint-disable react-hooks/exhaustive-deps */
  const {
    handleAction,
    handleIncrement,
    handleDecrement,
    handleSelectCommentToDelete,
  } = useMemo(() => {
    return {
      handleAction() {
        setState("default");
      },
      handleIncrement(current: number) {
        updateCommentScoreAction(id, current + 1);
      },
      handleDecrement(current: number) {
        updateCommentScoreAction(id, current - 1);
      },
      handleSelectCommentToDelete() {
        onSelectCommentToDelete(id, parentId as string | undefined);
      },
    };
  }, []);

  const toggleState = (state: Types.CommentState) => {
    return function handler() {
      setState((c) => (c === "default" ? state : "default"));
    };
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg w-full min-w-0 [&>*]:min-w-0 grid grid-rows-[auto_1fr_auto] md:grid-rows-[auto_1fr] grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto] items-start justify-items-start gap-x-6 gap-y-3">
        {/* Comment score counter */}
        <Counter
          countValue={score}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          className="row-[3/-1] md:row-[1/-1] mt-1 md:mt-0"
        />

        {/* Comment header section */}
        <div className="grid gap-x-2 items-center auto-cols-auto grid-flow-col">
          <Avatar
            src={`/images/avatars/${user.photo}`}
            className="w-8 h-8 row-span-2 sm:row-span-1 mr-2"
          />
          <h4 className="text-slate-600 text-lg font-semibold">
            {user.username}
          </h4>
          {isLoggedInUser && (
            <span className="text-[0.750rem] sm:text-sm font-medium px-2 py-px bg-primary text-slate-100 rounded-sm select-none">
              You
            </span>
          )}
          <p
            className={cn(
              "text-gray-500 leading-none row-start-2 sm:row-start-auto sm:col-auto",
              isLoggedInUser ? "col-[2/4]" : "col-[2/3]"
            )}
          >
            {createdAt}
          </p>
        </div>

        {/* Comment action buttons */}
        <CommentActionButtons
          onEdit={toggleState("edit")}
          onReply={toggleState("reply")}
          onDelete={handleSelectCommentToDelete}
          isLoggedInUser={isLoggedInUser}
          className="justify-self-end self-center row-end-[-1] md:row-end-auto"
        />

        {/* Render comment content */}
        {["default", "reply"].includes(state) && (
          <p className="text-slate-500 col-span-2 w-full">
            {replyTo && (
              <span className="text-primary font-medium">
                @{replyTo.username}{" "}
              </span>
            )}
            {content}
          </p>
        )}

        {/* Comment edit form */}
        {state === "edit" && (
          <CommentEditForm
            comment={comment}
            onAction={handleAction}
            className="col-span-2"
          />
        )}
      </div>

      {/* Reply comment form */}
      {state === "reply" && (
        <CommentReplyForm comment={comment} onAction={handleAction} />
      )}

      {/* Display the comment replies */}
      {replies && replies.length > 0 && <CommentReplies replies={replies} />}
    </div>
  );
}

const CommentReplies = memo(({ replies }: Types.CommentRepliesProps) => {
  return (
    <div className="space-y-5 mt-4 md:ml-10 pl-5 sm:pl-6 md:pl-10 border-l-2 border-gray-200">
      {replies.map((reply) => (
        <Comment key={reply.id} comment={reply} />
      ))}
    </div>
  );
});
CommentReplies.displayName = "CommentReplies";

const CommentActionButtons = memo(
  (props: Types.CommentActionButtonsProps) => {
    return (
      <div
        className={cn(
          "flex items-center gap-x-2.5 flex-wrap justify-end",
          props.className
        )}
      >
        {props.isLoggedInUser ? (
          <>
            <ModalOpenButton asChild>
              <Button
                variant="link"
                className="text-danger text-sm sm:text-base"
                onClick={props.onDelete}
              >
                <DeleteIcon
                  aria-hidden
                  className="fill-danger text-[0.750rem] sm:text-sm"
                />
                <span>Delete</span>
              </Button>
            </ModalOpenButton>
            <Button
              variant="link"
              className="text-sm sm:text-base"
              aria-pressed={false}
              onClick={toggleCallbackWrapper(props.onEdit)}
            >
              <EditIcon
                aria-hidden
                className="fill-primary text-[0.750rem] sm:text-sm"
              />
              <span>Edit</span>
            </Button>
          </>
        ) : (
          <Button
            variant="link"
            className="text-sm sm:text-base"
            aria-pressed={false}
            onClick={toggleCallbackWrapper(props.onReply)}
          >
            <ReplyIcon
              aria-hidden
              className="fill-primary text-[0.750rem] sm:text-sm"
            />
            <span>Reply</span>
          </Button>
        )}
      </div>
    );
  },
  () => true
);
CommentActionButtons.displayName = "CommentActionButtons";

export default Comment;
