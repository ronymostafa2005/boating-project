import type { LocalizedString } from "./boat";

export interface FAQ {
  _id: string;
  question: LocalizedString;
  answer: LocalizedString;
  order: number;
}

export interface PageContent {
  _id: string;
  slug: string;
  title: LocalizedString;
  content: LocalizedString;
  sections?: {
    title: LocalizedString;
    content: LocalizedString;
  }[];
}
