import api from '@/lib/cache';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    api.cache.set(req.body ?? "");
  }
  catch (e) {
    console.log('e, ', e);
  }
  res.status(200).json({ message: 'OK' })
}
