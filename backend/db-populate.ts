import { db } from './src/prisma/db.ts';


async function main() {
const expenses = await db.orm.public.Expense.createAll([
  { date: "2025-01-16", description: "Example expense #1 from Alice", payer: "Alice", amount: 25.5 },
  { date: "2025-01-15", description: "Example expense #2 from Bob", payer: "Bob", amount: 35 },
  { date: "2025-01-15", description: "Example expense #3 from Alice", payer: "Alice", amount: 2 }
]);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });