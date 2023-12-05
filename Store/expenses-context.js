import { createContext, useReducer } from "react";
export const ExpensesContext = createContext({
    expenses: [],
    setExpenses: (expenses) => {},
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { }
})

function expensesReducer(state, action){
    switch(action.type){
        case "ADD":
            return [action.payload, ...state];
        case "DELETE":
            return state.filter(exp => exp.id !== action.payload);
        case "SET":
            const inverted = action.payload.reverse();
            return inverted;
        case "UPDATE":
            const updateIndex = state.findIndex(exp => exp.id === action.payload.id);
            const updateableItem = state[updateIndex];
            const updatedItem = {...updateableItem, ...action.payload.data};
            const updatedExp = [...state]; 
            updatedExp[updateIndex] = updatedItem;
            return updatedExp;
        default:
            return state;
    }
}
function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expensesData){
        dispatch({type: "ADD", payload: expensesData})
    }
    function deleteExpense(id){
        dispatch({type: "DELETE", payload: id})
    }
    function updateExpense(id, expensesData){
        dispatch({type: "UPDATE", payload: { id: id, data: expensesData}})
    }
    function setExpenses(expenses){
        dispatch({type: "SET", payload: expenses})
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        setExpenses: setExpenses,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }
    return (  
        <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
    )
}
export default ExpensesContextProvider;