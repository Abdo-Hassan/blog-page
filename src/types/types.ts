export interface IBlog {
  id: number;
  useId: number;
  title: string;
  body: string;
}

export interface IAddArticle {
  title: string;
  author: string;
  content: string;
  publishedDate: string;
}
