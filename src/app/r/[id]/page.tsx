import { MiniCreatePost, PostFeed } from "@/components";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params }: PageProps) => {
  const { id } = params;
  const session = await getAuthSession();

  const subreddit = await db.subreddit.findFirst({
    where: { name: id },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
      },
    },
  });

  if (!subreddit) return notFound();

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">
        r/{subreddit.name}
      </h1>
      <MiniCreatePost session={session} />

      <PostFeed initialPosts={subreddit.posts} subredditName={subreddit.name} />
    </>
  );
};

export default page;
