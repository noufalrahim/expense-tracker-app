import { useContext } from "react";
import ExpensesOutput from "../Components/ExpensesOutput/ExpenseOutput/ExpOut"
import { ExpensesContext } from "../Store/expenses-context";
function AllExpenses(){

    const expCtx = useContext(ExpensesContext)
    return (
        <ExpensesOutput expenses={expCtx.expenses} expensePeriod = "Total" fallbackText={"No registered expenses found!"}/>
)
}

export default AllExpenses;