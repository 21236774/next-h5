import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function getArticlesByCategoryId(req: NextApiRequest, res: NextApiResponse) {
  const { categoryId = 0 } = req.query
  try {
    // 直接通过包含关系的方式查询指定分类下的所有文章
    const articles = await prisma.category.findUnique({
      where: {
        id: categoryId as number,
      },
      include: {
        posts: {
          include: {
            articles: true,
          },
        },
      },
    });
    console.log(articles, 5555);
    res.status(200).json({ code: 200, data: articles })
    // 注意这里的查询结果结构，你可能需要进一步处理articles.posts.articles来获取实际的文章列表
   
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    throw error;
  }
}