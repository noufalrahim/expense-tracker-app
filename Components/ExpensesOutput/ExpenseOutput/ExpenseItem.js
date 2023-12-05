import { Pressable, View, Text, StyleSheet } from "react-native";
import { getFormatedDate } from "../../../Util/Date";
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({id, description, amount, date}) {
    const navigation =  useNavigation();

    function pressHandler(){
        navigation.navigate("Manage Expenes", {
            expenseId: id
        });
    }
    return (
        <Pressable onPress={pressHandler} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.expItems}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    <Text style={styles.textBase}>{getFormatedDate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ExpenseItem;

const styles = StyleSheet.create({
    expItems: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 6,
        elevation: 3,
    },
    pressed: {
        opacity: 0.75
    },
    textBase: {
        color: "black",

    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: "bold",
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        minWidth: 18
    },
    amount: {
        color: "white",
        fontWeight: "bold",
    }
})