import type { Types } from "@/types";
import { memo, useEffect, useRef } from "react";

import Form from "@ui/form";
import Button from "@ui/button";
import InputTextarea from "@ui/input-textarea";

import cn from "@/utils/cn";
import { COMMENTS_CONTEXT } from "@/context/comments";
import { updateCommentContentAction } from "@/actions";

const CommentEditForm = memo(
  ({ comment, onAction, className }: Types.CommentEditFormProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { addOptimisticComments } = COMMENTS_CONTEXT;
    const { id, replyTo, content, parentId } = comment;
    const defaultValue = replyTo ? `@${replyTo.username}, ${content}` : content;
    const MIN_LENGTH = (replyTo ? `@${replyTo.username},` : "").length + 10;

    // Update comment content form action
    async function formAction(formData: FormData) {
      let content = formData.get("comment") as string;
      if (!content || content.length <= MIN_LENGTH) return onAction?.();
      if (replyTo) {
        // Trim the content value
        content = content
          .replace(new RegExp(`^@${replyTo.username}(,)?`), ``)
          .trim();
      }
      if (content === comment.content) return onAction?.();

      const action: Types.CommentsAction = !parentId
        ? { type: "comment/update", payload: { id, content } }
        : { type: "reply/update", payload: { id, parentId, content } };

      addOptimisticComments(action);
      if (typeof onAction === "function") {
        await Promise.resolve().then(onAction);
      }
      await updateCommentContentAction(id, content);
    }

    useEffect(() => {
      if (textareaRef.current === null) return;
      textareaRef.current.focus();
      textareaRef.current.selectionStart = defaultValue.length;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // This handle prevents deleting the replyTo username
    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
      if (
        replyTo &&
        e.currentTarget.value.length <= replyTo.username.length + 2 &&
        e.key === "Backspace"
      ) {
        e.preventDefault();
      }
    }

    return (
      <Form
        action={formAction}
        className={cn("flex flex-col gap-y-3 items-start", className)}
      >
        <InputTextarea
          name="comment"
          id="edit-comment"
          placeholder="Add a comment..."
          ref={textareaRef}
          minLength={MIN_LENGTH}
          defaultValue={defaultValue}
          onKeyDown={handleKeyDown}
          required
        />
        <Button variant="primary" type="submit" className="self-end">
          Update
        </Button>
      </Form>
    );
  }
);
CommentEditForm.displayName = "CommentEditForm";

export default CommentEditForm;
