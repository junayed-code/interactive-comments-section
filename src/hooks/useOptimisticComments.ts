import type { Types } from "@/types";

import { useOptimistic } from "react";

const reducer = (state: Types.Comment[], action: Types.CommentsAction) => {
  switch (action.type) {
    case "comment/add":
      return [...state, action.payload];

    case "reply/add": {
      const { parentId } = action.payload;
      if (!parentId) return state;
      return state.map((parent) => {
        if (parent.id !== parentId) return parent;
        // Add reply comment to the parent comment;
        const replies = [...(parent.replies ?? []), action.payload];
        return { ...parent, replies };
      });
    }

    case "comment/update": {
      const { id, content } = action.payload;
      return state.map((c) => {
        if (c.id !== id) return c;
        return { ...c, content };
      });
    }

    case "reply/update": {
      const { id, parentId, content } = action.payload;
      return state.map((c) => {
        if (c.id !== parentId || !(c.replies && c.replies.length > 0)) return c;
        // Update the reply comment
        c.replies = c.replies.map((r) => {
          if (r.id !== id) return r;
          return { ...r, content };
        });
        return c;
      });
    }

    case "comment/delete":
      return state.filter((com) => com.id !== action.payload);

    case "reply/delete":
      const { id, parentId } = action.payload;
      return state.map((c) => {
        if (c.id === parentId && c.replies && c.replies.length > 0) {
          c.replies = c.replies.filter((rep) => rep.id !== id);
        }
        return c;
      });
    default:
      return state;
  }
};

export const useOptimisticComments = (
  comments: Types.CommentsProps["comments"]
) => {
  return useOptimistic(comments, reducer);
};
