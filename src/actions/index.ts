"use server";

import type { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createComment, updateComment, deleteComment } from "@lib/db/comments";

import { USER } from "@/app.config";

type CommentCreateInput = Omit<Prisma.CommentUncheckedCreateInput, "userId"> & {
  userId?: string;
};

export const sendCommentAction = async ({
  userId = USER.id,
  ...restInputs
}: CommentCreateInput) => {
  try {
    await createComment({ userId, ...restInputs });
  } finally {
    revalidatePath("/", "page");
  }
};

export const updateCommentContentAction = async (
  commentId: string,
  content: string
) => {
  const data = { content };
  try {
    await updateComment(commentId, data);
  } finally {
    revalidatePath("/", "page");
  }
};

export const updateCommentScoreAction = async (
  commentId: string,
  score: number
) => {
  try {
    const data = { score };
    await updateComment(commentId, data);
  } finally {
    revalidatePath("/", "page");
  }
};

export const deleteCommentAction = async (commentId: string) => {
  try {
    await deleteComment(commentId);
  } finally {
    revalidatePath("/", "page");
  }
};
