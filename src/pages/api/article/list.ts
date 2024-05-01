import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function getArticlesByCategoryId(req: NextApiRequest, res: NextApiResponse) {
  const { categoryId = 0 }: any = req.query
  try {
    // 直接通过包含关系的方式查询指定分类下的所有文章
    const articles = await prisma.category.findUnique({
      where: {
        id: categoryId * 1,
      },
      // 查询一对多的关系
      include: {
        articles: {
          include: {
            articles: true,
          },
        },
      },
    })
    const post = articles?.articles
    if(articles) {
      (articles as any).posts ??= JSON.parse(JSON.stringify(post))
      delete (articles as any).articles
    }
    if(categoryId == 0) {
      const data = await prisma.article.findMany()
      if(post && data.length) {
        const arr: { articleId: number; articles: { id: number; title: string; text: string; date: Date | null; remark: string | null; authId: number | null; abstract: string | null; tags: string | null; disabled: number | null; }; categoryId: number; }[] = []
        data.forEach(item => {
          arr.push({
            articleId: item.id,
            articles: item,
            categoryId: 0
          })
        });
        (articles as any).posts = arr
      }
    }
    
    res.status(200).json({ code: 200, data: articles })
    // 注意这里的查询结果结构，你可能需要进一步处理articles.posts.articles来获取实际的文章列表
   
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    throw error;
  }
}