import { request } from "@/service";

export const getCategoryData = () => {
  return request.get("/api/category")
};

export const getArticleData = (typeId: number) => {
  return request.get("/api/article?categoryId="+ typeId)
};