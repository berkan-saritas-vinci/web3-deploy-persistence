import fs from "fs";
import { db } from "../src/prisma/db.ts";
import type { Expense, NewExpense } from "../types/expense.ts";

export class ExpensesService {
  private static dataPath = "./data/expenses.json";
  private static resetPath = "./data/expenses.init.json";

  public static async getExpenses(): Promise<Expense[]> {
    try {
      const rows = await db.orm.public.Expense.all();
      const expenses = rows.map((row: any) => ({
        id: row.id.toString(),
        date: row.date,
        amount: row.amount,
        description: row.description,
        payer: row.payer,
      }));
      console.log(expenses);
      return expenses;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public static async addExpense(newExpense: NewExpense): Promise<Expense> {
    

    try {

      const expense = await db.orm.public.Expense.create(newExpense);
      return {
        id: expense.id.toString(),
        date: expense.date,
        amount: expense.amount,
        description: expense.description,
        payer: expense.payer
      }

    } catch(err) {
      throw err;
    }
  }

  public static resetExpenses(): Expense[] {
    this._resetExpenses();
    return this.readExpenses();
  }

  private static readExpenses(): Expense[] {
    try {
      const data = JSON.parse(fs.readFileSync(this.dataPath, "utf-8"));
      return data;
    } catch (error) {
      console.error("Error reading expenses file:", error);
      throw error;
    }
  }

  private static saveExpenses(expenses: Expense[]): void {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(expenses, null, 2));
    } catch (error) {
      console.error("Error saving expenses file:", error);
      throw error;
    }
  }

  private static _resetExpenses(): void {
    try {
      const defaultExpenses: Expense[] = JSON.parse(
        fs.readFileSync(this.resetPath, "utf-8"),
      );
      fs.writeFileSync(this.dataPath, JSON.stringify(defaultExpenses, null, 2));
    } catch (error) {
      console.error("Error resetting expenses file:", error);
      throw error;
    }
  }
}
