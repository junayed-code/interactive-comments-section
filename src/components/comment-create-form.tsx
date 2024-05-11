"use client";

import { memo, useRef } from "react";

import Form from "@ui/form";
import Avatar from "@ui/avatar";
import Button from "@ui/button";
import InputTextarea from "@ui/input-textarea";

import { USER } from "@/app.config";
import { sendCommentAction } from "@/actions";
import { COMMENTS_CONTEXT } from "@/context/comments";

const CommentCreateForm = memo(() => {
  const formRef = useRef<HTMLFormElement>(null);
  const { addOptimisticComments } = COMMENTS_CONTEXT;

  // Comment create form action
  async function formAction(formData: FormData) {
    const content = formData.get("comment")?.toString();
    if (!content) return;

    const comment = {
      id: (Date.now() * (Math.random() + 1)).toFixed(0),
      content,
      user: USER,
      score: 0,
      createdAt: new Date(),
      parentId: null,
      replyTo: null,
    };

    addOptimisticComments({ type: "comment/add", payload: comment });
    formRef.current?.reset();
    await sendCommentAction({ content });
  }

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
        placeholder="Add a comment..."
        className="col-span-3 md:col-span-1"
        required
      />
      <Button variant="primary" type="submit" className="col-start-3">
        Send
      </Button>
    </Form>
  );
});
CommentCreateForm.displayName = "CommentCreateForm";

export default CommentCreateForm;
