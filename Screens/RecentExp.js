import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../Components/ExpensesOutput/ExpenseOutput/ExpOut";
import { ExpensesContext } from "../Store/expenses-context";
import { getDateMinusDays } from "../Util/Date";
import { fetchExpenses } from "../Util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";
function RecentExpenses(){
    const expCtx = useContext(ExpensesContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        async function getExpenses(){
            setIsLoading(true);
            try{
                const expenses = await fetchExpenses();
                expCtx.setExpenses(expenses);
 
            }catch(error){
                setError("Could not fetch expenses!");
            }
            setIsLoading(false);
        }
        getExpenses();

    }, []);

    function confirmHandler(){
        setError(null);
    }
    if(error){
        return <ErrorOverlay message={error} onConfirm={confirmHandler}/>
    }

    if(isLoading){
        return <LoadingOverlay />
    }
    
    const recentExpenses = expCtx.expenses.filter(expense => {
        const today = new Date();
        const date7daysAgo = getDateMinusDays(today, 10);
        return (expense.date >= date7daysAgo && expense.date <= today);
    })
    return (
        <ExpensesOutput expenses={recentExpenses} expensePeriod = "Last 7 days" fallbackText={"No Expenses registered for the last 7 days!"}/>
)
}

export default RecentExpenses;