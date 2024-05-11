import type { Prisma } from "@prisma/client";
import prisma from "@lib/prisma";

export const getComments = async () => {
  const comments = await prisma.comment.findMany({
    where: { parentId: { isSet: false } },
    select: {
      id: true,
      content: true,
      score: true,
      createdAt: true,
      user: true,
      replies: {
        select: {
          id: true,
          content: true,
          score: true,
          parentId: true,
          createdAt: true,
          user: true,
          replyTo: true,
        },
      },
    },
  });

  return comments;
};

export const createComment = async (
  data: Prisma.CommentUncheckedCreateInput
) => {
  const comment = await prisma.comment.create({ data });
  return comment;
};

export const updateComment = async (
  id: string,
  data: Prisma.CommentUpdateInput
) => {
  const comment = await prisma.comment.update({ where: { id }, data });
  return comment;
};

export const deleteComment = async (id: string) => {
  const comment = await prisma.comment.delete({ where: { id } });
  return comment;
};
