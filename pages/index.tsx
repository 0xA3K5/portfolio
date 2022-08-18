import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NotionPost } from '../@types/schema';
import Head from 'next/head';
import ContentCard from '../src/components/ContentCard';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import NotionService from './api/notion';
import CTA from '../src/components/CTA';

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const pageTitle = data.homePage.title;
  const pageDesc = data.homePage.description;

  return (
    <main className='h-screen w-screen snap-y snap-mandatory overflow-scroll'>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' title='description' content={pageDesc} />
        <meta name='og:description' title='og:description' content={pageDesc} />
        <meta name='og:image' title='og:title' content='/ak-logo.svg' />
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <section className='container flex h-screen snap-start flex-col'>
        <Header />
        <div className='mx-24 max-w-2xl translate-y-1/2'>
          <div className='flex flex-col space-y-8'>
            <h1 className='font-bogart text-4xl font-bold md:text-5xl lg:text-6xl'>
              {data.homePage.heroTitle}
            </h1>
            <p className='text-lg md:text-xl'>{data.homePage.heroText}</p>
          </div>
        </div>
      </section>
      <div className='flex flex-col'>
        {data.portfolioPosts.map((p: NotionPost, i: number) => {
          return (
            <div key={i} style={{ backgroundColor: `#${p.bgColor}` }}>
              {p.vertical ? (
                <ContentCard.Vertical key={p.id} post={p} />
              ) : (
                <ContentCard.Horizontal key={p.id} post={p} />
              )}
            </div>
          );
        })}
      </div>
      <div className='flex flex-col'>
        {data.sideProjects.map((p: NotionPost, i: number) => {
          return (
            <div key={`side-${i}`} style={{ backgroundColor: `#${p.bgColor}` }}>
              {p.vertical ? (
                <ContentCard.Vertical key={p.id} post={p} />
              ) : (
                <ContentCard.Horizontal key={p.id} post={p} />
              )}
            </div>
          );
        })}
      </div>
      <CTA
        className='snap-center'
        title='I occasionally take freelance work'
        desc='I help startups with product design, design critics, QA testing and design advisory.'
      />
      <Footer />
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();

  const portfolioPosts = await notionService.getPortfolioPosts();
  const sideProjects = await notionService.getSideProjects();

  const homePage = (await notionService.getStaticPages())[0];

  return {
    props: {
      data: {
        homePage,
        portfolioPosts,
        sideProjects,
      },
    },
  };
};
