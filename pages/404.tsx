import { GetStaticProps } from "next";
import { NotionPost, StaticPage } from "../@types/schema";
import NotionService from "./api/notion";
import Image from "next/image";
import { useEffect, useState } from "react";
import PageHero from "../src/components/PageHero";
import PageHead from "../src/components/PageHead";
import { motion } from "framer-motion";
import Header from "../src/components/Header/Header";
import MobileMenu from "../src/components/Header/MobileMenu";
import ContentCard from "../src/components/Cards/ContentCard";
import SectionTitle from "../src/components/SectionTitle";

interface FourOhFourProps {
  page: StaticPage;
  posts: NotionPost[];
}

export default function FourOhFour({
  page,
  posts,
}: FourOhFourProps): JSX.Element {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [color, setColor] = useState<string>("fff");
  const [bgColor, setBgColor] = useState<string>("000");
  const [hovered, setHovered] = useState<NotionPost>(null);

  useEffect(() => {
    setColor(hovered?.properties?.color || "ffffff");
    setBgColor(hovered?.properties?.bgColor || "000000");
  }, [hovered]);

  const bgPainterVariants = {
    initial: {
      backgroundColor: "#ffffff",
    },
    target: {
      backgroundColor: `#${bgColor}`,
    },
  };

  const pageVariants = {
    hidden: { opacity: 0, x: 0, y: -60, transition: { duration: 0.2 } },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
      color: `#${color}`,
      transition: { duration: 0.3 },
    },
    exit: { opacity: 0, x: 0, y: -60, transition: { duration: 0.6 } },
  };

  return (
    <>
      <div className="fixed -z-50 h-screen w-screen">
        <motion.div
          variants={bgPainterVariants}
          initial="initial"
          animate="target"
          onChange={() => motion.animate}
          transition={{
            ease: "easeInOut",
            duration: 0.3,
          }}
          className="absolute top-1/2 left-1/2 h-screen w-screen -translate-x-1/2 -translate-y-1/2 transform"
        />
      </div>
      <PageHead page={page} />
      <motion.main
        variants={pageVariants}
        initial="hidden"
        animate="enter"
        onChange={() => motion.animate}
        exit="exit"
        transition={{ type: "linear" }}
      >
        <Header isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} />
        <MobileMenu
          isNavbarOpen={isNavbarOpen}
          setIsNavbarOpen={setIsNavbarOpen}
        />
        <div className="container flex max-w-5xl flex-col items-center space-y-24 px-4 md:px-12 xl:max-w-6xl">
          <PageHero
            page={page}
            isNavbarOpen={isNavbarOpen}
            setIsNavbarOpen={setIsNavbarOpen}
          />
          <section className="flex w-full flex-col px-4 py-24 lg:px-0">
            <SectionTitle title="highlighted case studies" className="mb-16" />
            <div className="flex items-center space-x-4">
              <div className="flex w-full flex-col space-y-8 md:space-y-12 lg:w-1/2 lg:pr-12">
                {posts
                  .sort(
                    (a: NotionPost, b: NotionPost) =>
                      a.properties.number - b.properties.number
                  )
                  .map((p: NotionPost) => {
                    return (
                      <ContentCard.Compact
                        post={p}
                        key={p.properties.id}
                        onMouseEnter={() => setHovered(p)}
                        onMouseLeave={() => setHovered(null)}
                      />
                    );
                  })}
              </div>
              {hovered && (
                <div className="relative hidden flex-1 lg:inline-block">
                  <Image
                    src={hovered.details.img}
                    alt={hovered.details.title}
                    layout="responsive"
                    height="80%"
                    width="100%"
                    objectFit="contain"
                    objectPosition="top"
                    priority
                    unoptimized
                  />
                </div>
              )}
            </div>
          </section>
        </div>
      </motion.main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();

  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === "404"
  );

  const posts = (await notionService.getCaseStudies()).filter(
    (p) => p.properties.tag !== "Side Project"
  );

  return {
    props: {
      page,
      posts,
    },
  };
};
