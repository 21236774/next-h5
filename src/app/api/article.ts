import { request } from "@/service";

export const getCategoryData = () => {
  return request.get("/api/category/list")
};

export const getArticleData = (typeId: number) => {
  return request.get("/api/article/list?categoryId="+ typeId)
};

export const getArticleDetail = (id: number | string) => {
  console.log(id, 222)
  return request.get("/api/article/detail/" + id)
};