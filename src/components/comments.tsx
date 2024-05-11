import type { Types } from "@/types";
import { memo } from "react";

import Comment from "@/components/comment";

const Comments = memo(({ comments }: Types.CommentsProps) => {
  return (
    <div className="space-y-4">
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
});
Comments.displayName = "Comments";

export default Comments;
