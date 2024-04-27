import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function fetchSomeData(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma.category.findMany()
    res.status(200).json({ code: 200, data })
  } catch (error) {
    res.status(500).json({ code: 500, message: 'Internal server error' });
  }
}