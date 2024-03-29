import Head from "next/head";
import NotionService from "../api/notion";
import ReactMarkdown from "react-markdown";
import { config } from "../../config";
import OverviewCard from "../../src/components/Cards/OverviewCard";
import { getMorePosts } from "../../src/utils/get-more-posts";
import MorePosts from "../../src/components/MorePosts";
import { NotionPost, Feedback, Collaborator } from "../../src/types";
import FeedbackCard from "../../src/components/Cards/FeedbackCard";
import { motion } from "framer-motion";
import { motionVariants } from "../../src/constants/motion-variants";
import { useRouter } from "next/router";
import Login from "../../src/components/Form/Login";
import { useSession } from "next-auth/react";
import Hero from "../../src/components/Hero";
import { useTheme } from "../../src/contexts/ThemeContext";
import Layout from "../../src/components/Layout";
import { MdStringObject } from "notion-to-md/build/types";

interface DetailProps {
  markdown: MdStringObject;
  post: NotionPost;
  morePosts: NotionPost[];
  feedbacks: Feedback[];
  hasReadPermission?: boolean;
  collaborators: Collaborator[];
}

export default function Detail({
  markdown,
  post,
  morePosts,
  feedbacks,
  collaborators,
}: DetailProps) {
  const { status } = useSession();
  const router = useRouter();

  const { theme, themeClasses } = useTheme();

  const postFeedbacks = feedbacks.filter((f) =>
    post.feedbacks.relationIds.includes(f.id)
  );

  const postCollaborators = collaborators.filter((c) =>
    post.details.collaborators.relationIds.includes(c.id)
  );

  return (
    <Layout>
      <Head>
        <title>{post.details.title}</title>
        <meta
          name="description"
          title="description"
          content={post.details.description}
        />
        <meta
          name="og:description"
          title="og:description"
          content={post.details.description}
        />
        <meta name="og:image" title="og:title" content={post.details.img} />
      </Head>
      {post.properties.password === false || status === "authenticated" ? (
        <motion.main
          variants={motionVariants.pageVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ type: "linear" }}
          className="flex w-full flex-col items-center"
        >
          <Hero.Post post={post} className="w-full" />
          <div className="flex w-full max-w-5xl flex-col items-center gap-24 px-4 py-24 2xl:max-w-6xl">
            <OverviewCard post={post} collaborators={postCollaborators} />
            <article
              className={`${
                theme === "light" ? "prose" : "prose-invert"
              } prose-a:${
                themeClasses.textHighlight
              } prose prose-lg prose-headings:font-vollkorn prose-headings:font-semibold prose-h1:text-3xl prose-h3:font-normal prose-p:font-light prose-p:leading-snug prose-p:tracking-wide   prose-a:duration-150 prose-a:hover:text-white prose-ul:font-light prose-ul:tracking-wider prose-img:rounded-xl md:prose-h1:text-5xl`}
            >
              <ReactMarkdown>{markdown["parent"]}</ReactMarkdown>
            </article>
            {postFeedbacks.length > 0 && (
              <FeedbackCard.Grouped
                classname="w-full md:w-11/12"
                feedback={postFeedbacks}
              />
            )}
            <MorePosts posts={morePosts} />
          </div>
        </motion.main>
      ) : (
        <Login redirectPath={router.asPath} />
      )}
    </Layout>
  );
}

export async function getStaticProps(context) {
  const pages = await getMorePosts(context.params?.slug as string);

  const notionService = new NotionService();

  const feedbacks = await notionService.getFeedbacks();
  const collaborators = await notionService.getCollaborators();

  const p = await notionService.getNotionPageDetail(
    context.params?.slug as string,
    config.NOTION_CASE_STUDIES,
    "post"
  );

  return {
    props: {
      markdown: p.markdown,
      post: p.post,
      morePosts: pages.morePosts,
      feedbacks: feedbacks,
      collaborators,
    },
  };
}

export async function getStaticPaths() {
  const notionService = new NotionService();

  const posts = await notionService.getCaseStudies();

  const paths = posts.map((p) => {
    return `/works/${p.properties.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}
