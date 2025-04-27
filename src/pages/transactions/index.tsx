// // const Transactions = (props) => {
// //   return <span>Transactions Page</span>;
// // };

// // export default Transactions;

// /*
// import { TransactionTable } from "@/components/TransactionTable";
// import { getTransactions } from "@/lib/api"; // pretend you have API

// export default async function TransactionsPage() {
//   const transactions = await getTransactions(); // Fetch transactions here

//   return <TransactionTable transactions={transactions} />;
// }
// */
"use client";

import { Badge } from "@/components/ui/badge"; // make sure you create this file
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/utils/numberUtils";

interface Transaction {
  id: number;
  date: string;
  amount: number;
  note: string | null;
  recipient: string | null;
  userId: string;
  bankAccountId: number;
  categoryId: number;
}

// Dummy transactions (static for now)
const transactions: Transaction[] = [
  {
    id: 1,
    date: "2025-04-18T03:21:10.963Z",
    amount: 152390,
    note: null,
    recipient: null,
    userId: "google-oauth2|10312802",
    bankAccountId: 4,
    categoryId: 1,
  },
  {
    id: 2,
    date: "2025-04-14T02:16:46.022Z",
    amount: 13143,
    note: "Withdrawal transaction",
    recipient: "Runolfsson - Homenick",
    userId: "google-oauth2|10312802",
    bankAccountId: 4,
    categoryId: 2,
  },
  // ➡️ Add more transactions if needed
];

export default function TransactionsPage(props) {
  return (
    <div className="p-6">
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((txn) => (
                  <TableRow key={txn.id} className="hover:bg-muted/50 even:bg-muted/20">
                    <TableCell>
                      {new Date(txn.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="font-bold">
                      {formatCurrency(txn.amount / 100)}
                    </TableCell>
                    <TableCell>{txn.note ?? "—"}</TableCell>
                    <TableCell>{txn.recipient ?? "—"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={txn.categoryId === 1 ? "success" : "destructive"}
                      >
                        {txn.categoryId === 1 ? "Income" : "Expense"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
