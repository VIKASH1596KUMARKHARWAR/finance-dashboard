import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export default function TransactionsPage({ transactions }: Props) {
  return (
    <Card className="shadow-md rounded-2xl">
      <CardContent>
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
            {transactions.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell>{new Date(txn.date).toLocaleDateString()}</TableCell>
                <TableCell className="font-bold">{formatCurrency(txn.amount)}</TableCell>
                <TableCell>{txn.note ?? "—"}</TableCell>
                <TableCell>{txn.recipient ?? "—"}</TableCell>
                <TableCell>
                  <Badge variant={txn.categoryId === 1 ? "success" : "destructive"}>
                    {txn.categoryId === 1 ? "Income" : "Expense"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
