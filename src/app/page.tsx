import type { Types } from "@/types";

import { getComments } from "@/lib/db/comments";
import CommentsSection from "@/components/comments-section";

export default async function Home() {
  const comments = (await getComments()) as Types.Comment[];

  return (
    <main className="px-5 py-12">
      <section className="max-w-3xl mx-auto">
        <CommentsSection comments={comments} />
      </section>
    </main>
  );
}
