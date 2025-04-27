// services/transaction.service.ts
import { Transaction, CreateTransactionDto } from '@/types/Transaction.types';
import { prisma } from '@/server/db';
import { toCents } from '@/utils/numberUtils';

const transformTransaction = ({ id, date, amount, note, recipient, bankAccountId, categoryId }: Transaction) => ({
  id,
  date,
  amount: amount / 100, // assuming amount is stored in cents
  note,
  recipient,
  bankAccountId,
  categoryId,
});

export const create = async (transaction: CreateTransactionDto, userId: string) => {
  const createdTransaction = await prisma.transaction.create({
    data: {
      date: transaction.date,
      amount: toCents(transaction.amount), // Convert amount to cents if necessary
      note: transaction.note,
      recipient: transaction.recipient,
      userId,
      bankAccountId: transaction.bankAccountId,
      categoryId: transaction.categoryId,
    },
  });

  return transformTransaction(createdTransaction);
};

export const getAll = async (userId: string) => {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: 'desc',
    },
  });

  return transactions.map((transaction) => transformTransaction(transaction));
};

export const deleteById = async (id: number, userId: string) => {
  return prisma.transaction.delete({
    where: {
      id,
      userId,
    },
  });
};

export const update = async (id: number, transaction: CreateTransactionDto) => {
  const updatedTransaction = await prisma.transaction.update({
    data: {
      date: transaction.date,
      amount: toCents(transaction.amount),
      note: transaction.note,
      recipient: transaction.recipient,
      bankAccountId: transaction.bankAccountId,
      categoryId: transaction.categoryId,
    },
    where: {
      id,
    },
  });

  return transformTransaction(updatedTransaction);
};
