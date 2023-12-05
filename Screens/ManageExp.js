import { useContext, useLayoutEffect } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import IconBtn from "../UI/IconButton";
import { ExpensesContext } from "../Store/expenses-context";
import ExpenseForm from "../Components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../Util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import { useState } from "react";
import ErrorOverlay from "../UI/ErrorOverlay";
function ManageExpenses({ route, navigation }) {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const expCtx = useContext(ExpensesContext)
    const editedExpenseId = route.params?.expenseId;

    const selectedExp = expCtx.expenses.find(exp => exp.id === editedExpenseId);
    const isEditing = !!editedExpenseId;
    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        })
    }, [navigation, isEditing])

    function ErrorHandler(){
        setError(null);
    }
    async function DeleteExpense() {
        setIsLoading(true);
        try{
            await deleteExpense(editedExpenseId);
            expCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        }catch(error){
            setError("Could not delete expense!");
        }
        setIsLoading(false);
    }
    async function confirmHandler(expenseData) {
        setIsLoading(true);
        try{
            if (isEditing) {
                expCtx.updateExpense(editedExpenseId, expenseData);
                setIsLoading(true);
                await updateExpense(editedExpenseId, expenseData);
                setIsLoading(false);
            }
            else {
                
                const id = await storeExpense(expenseData);
                expCtx.addExpense({...expenseData, id: id})
            }
            navigation.goBack();

        }catch(error){
            setError("Could not store expense!");
            setIsLoading(false);
        }
        
    }
    function cancelHandler() {

        navigation.goBack();
    }

    if(error && !isLoading){
        return <ErrorOverlay message={error} onConfirm={ErrorHandler}/>
    } 

    if (isLoading) {
        return <LoadingOverlay />
    }

    return (
        <View style={style.container}>
            <ExpenseForm
                onSubmit={confirmHandler}
                submitButtonLabel={isEditing ? "Update" : "Add"}
                onCancel={cancelHandler} 
                defaultValues={selectedExp}
                />
            {isEditing ?
                <View style={style.deleteContainer}>
                    <IconBtn icon={"trash"} size={36} color={"black"} onPress={DeleteExpense} />
                </View>
                : null}
        </View>
    )
}

export default ManageExpenses;

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "white"
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: "black",
        alignItems: "center"
    },

})