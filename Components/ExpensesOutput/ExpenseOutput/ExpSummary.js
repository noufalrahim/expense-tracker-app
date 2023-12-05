import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../../Constants/Styles";
function ExpSummary({expenses, periodName }){
    const expSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount
    }, 0);
    return(
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>₹{expSum.toFixed(2)}</Text>
        </View>
    )
}
export default ExpSummary;

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: "white",
        borderRadius: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    period:{
        fontSize: 12,
        color: "grey"
    },
    sum: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black"
    }

})