import type { Types } from "@/types";
import React, { useEffect, useRef } from "react";

import Form from "@ui/form";
import Avatar from "@ui/avatar";
import Button from "@ui/button";
import InputTextarea from "@ui/input-textarea";

import { USER } from "@/app.config";
import { sendCommentAction } from "@/actions";
import { COMMENTS_CONTEXT } from "@/context/comments";

const CommentReplyForm = ({
  comment,
  onAction,
}: Types.CommentReplyFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { user } = comment;
  const { addOptimisticComments } = COMMENTS_CONTEXT;
  const defaultValue = `@${user.username}, `;
  const MIN_LENGTH = defaultValue.length + 10;

  // Submit reply comment form action
  async function formAction(formData: FormData) {
    let content = formData.get("comment") as string;
    if (!content || content.length <= MIN_LENGTH) return onAction?.();
    // Trim the content value
    content = content.replace(new RegExp(`^@${user.username}(,)?`), ``).trim();

    const parentId = comment.parentId ?? comment.id;
    const reply = {
      id: (Date.now() * Math.random()).toFixed(0),
      content,
      score: 0,
      parentId,
      user: USER,
      createdAt: new Date(),
      replyTo: user,
    };

    addOptimisticComments({ type: "reply/add", payload: reply });
    formRef.current?.reset(); // Reset the form
    if (typeof onAction === "function") {
      await Promise.resolve().then(onAction);
    }
    await sendCommentAction({ content, parentId, replyToId: user.id });
  }

  // This handle prevents deleting the replyTo username
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (
      e.currentTarget.value.length <= defaultValue.length &&
      e.key === "Backspace"
    ) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    if (textareaRef.current === null) return;
    textareaRef.current.focus();
    textareaRef.current.selectionStart = defaultValue.length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      ref={formRef}
      action={formAction}
      className="grid gap-4 grid-cols-[auto_1fr_auto] items-start bg-white p-6 mt-5 rounded-lg"
    >
      <Avatar
        className="row-start-2 md:row-start-1"
        src={`/images/avatars/${USER.photo}`}
        alt={`${USER.username}'s avatar`}
      />
      <InputTextarea
        name="comment"
        id="create-comment"
        placeholder="Add a reply..."
        className="col-span-3 md:col-span-1"
        ref={textareaRef}
        defaultValue={defaultValue}
        onKeyDown={handleKeyDown}
        minLength={MIN_LENGTH}
        required
      />
      <Button variant="primary" type="submit" className="col-start-3">
        Reply
      </Button>
    </Form>
  );
};

export default CommentReplyForm;
