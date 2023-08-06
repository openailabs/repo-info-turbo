import { useState } from "react";
import { trpc } from "@/utils/trpc";

export const useSaveOrUpdateNote = async ({ owner, repoName }) => {
  const saveNote = trpc.note.saveNote.useMutation();
  const repo = `${owner}/${repoName}`;
  saveNote.mutate({
    owner: owner,
    name: repoName,
    userId: "user_2TTGbqMLZKHmguECRbXcb8TeuMX",
    note: {
      tags: ["node.js", "next.js", "next-auth"],
      content: "这是个不错的仓库",
    },
  });
  return { useSaveOrUpdateNote };
};

// const {saveOrUpdateNote}= useSaveNote();
