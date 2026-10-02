import type { Expense } from "../types/Expense";
import ExpenseItem from "../components/ExpenseItem";
import { useState } from "react";
import ExpenseAdd from "../components/ExpenseAdd";
import useExpenses from "../hooks/useExpenses";
import ExpenseReset from "../components/ExpenseReset";
import ExpenseSorter from "../components/ExpenseSorter";
import "./Home.css"

function Home() {
  const { expenses, addExpense, resetExpenses } = useExpenses();
  const [sortingAlgo, setSortingAlgo] = useState<(a: Expense, b: Expense) => number>(() => () => 1);

  const handleAlgoChange = (algo: (a: Expense, b: Expense) => number) => {
    setSortingAlgo(() => algo); // We're wrapping algo in a function because useState setter accept either a value or a function returning a value.
  };

  const sortedExpenses = [...expenses].sort(sortingAlgo);

  // if(expenses.length == 0){
  //   return <p>Loading</p>
  // }

  return (
  <div className="home-container">
    <h1 className="home-title">Manage your expenses</h1>

    <ExpenseAdd addExpense={addExpense} />

    <div className="action-section">
      <ExpenseReset resetExpenses={resetExpenses} />
    </div>

    <h2 className="expenses-title">Your expenses</h2>

    {sortedExpenses.length > 0 && (
      <div className="sorter-container">
        <ExpenseSorter setSortingAlgo={handleAlgoChange} />
      </div>
    )}

    <ul className="expenses-list">
      {sortedExpenses.map((expense) => (
        <li key={expense.id} className="expense-card">
          <ExpenseItem expense={expense} />
        </li>
      ))}
    </ul>
  </div>
);
}

export default Home;
