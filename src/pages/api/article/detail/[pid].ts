import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();
export default async function getArticlesByDetailId(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query
  if(!pid) {
    return res.status(404).json({ code: 404, data: [], msg: '文章不存在' })
  }
  const data = await prisma.article.findMany({
    where: {
      id: Number(pid)
    }
  })
  if(!data.length) {
    return res.status(404).json({ code: 404, data: [], msg: '文章不存在' })
  }
  res.status(200).json({ code: 200, data, msg: pid })
}
