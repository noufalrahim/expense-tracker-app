import { View, Text, StyleSheet } from "react-native";
import ExpSummary from "./ExpSummary";
import ExpList from "./ExpensesList";


function ExpensesOutput({ expenses, expensePeriod, fallbackText }) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>

    if(expenses.length > 0){
        content = <ExpList expenses = {expenses}/>
    }
    return (
        <View style = {styles.container}>
        <ExpSummary expenses={expenses} periodName = {expensePeriod}/>
        {content}
        </View>
    )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 24,
        flex: 1,
        backgroundColor: "grey",
    },
    infoText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
        marginTop: 32
    }
})