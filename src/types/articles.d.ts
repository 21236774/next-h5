declare interface ApiData<T> {
  code: number,
  data: T
  message?: string
}
declare namespace Articles {
  interface Item {
    id: number;
    title: string;
    text: string;
    user: string;
    date: string;
    remark: null | string;
    authId: number;
    abstract: string;
    tags: string;
    disabled: null | number;
    [key: string]: any;
  }
  interface Category<T> {
    id: number;
    tagName: string;
    cTime: string;
    uTime: null | string;
    disabled: number;
    posts?: T[];
  }
  interface Post {
    articleId: number;
    articles: Item;
    categoryId: number;
  }
}
