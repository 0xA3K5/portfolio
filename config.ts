import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const config = {
  NOTION_API_KEY: process.env.NOTION_API_KEY,
  NOTION_CASE_STUDIES: process.env.NOTION_CASE_STUDIES,
  NOTION_SIDE_PROJECTS: process.env.NOTION_SIDE_PROJECTS,
  NOTION_FEEDBACKS: process.env.NOTION_FEEDBACKS,
  NOTION_EXPLORATIONS: process.env.NOTION_EXPLORATIONS,
  NOTION_PLAYGROUND: process.env.NOTION_PLAYGROUND,
  NOTION_BOOKMARKS: process.env.NOTION_BOOKMARKS,
  NOTION_PAGES: process.env.NOTION_PAGES,
  NOTION_WORK_EXPERIENCES: process.env.NOTION_WORK_EXPERIENCES,
  NOTION_COLLABORATORS: process.env.NOTION_COLLABORATORS,
  NOTION_IDEAS: process.env.NOTION_IDEAS,
  PAGE_PASSWORD: process.env.PAGE_PASSWORD,
};
