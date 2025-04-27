// pages/api/transactions/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { create, getAll } from '@/services/transaction.service';
import { getSession } from 'next-auth/react'; // Assuming you are using next-auth for authentication

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = session.user.id;

  if (req.method === 'GET') {
    try {
      const transactions = await getAll(userId);
      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { date, amount, note, recipient, bankAccountId, categoryId } = req.body;
      const transaction = await create({ date, amount, note, recipient, bankAccountId, categoryId }, userId);
      return res.status(201).json(transaction);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create transaction' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
