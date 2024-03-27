export interface IBlog {
  id: number;
  useId: number;
  title: string;
  body: string;
}

export interface IAddArticle {
  edit?: boolean;
  id?: number;
  title: string;
  author: string;
  content: string;
}
