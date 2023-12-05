import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../../UI/Buttons";
function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
    const [inputVal, setInputVal] = useState({
        amount:
        {
            value: defaultValues ? defaultValues.amount.toString() : "",
            isValid: true,
        },
        date:
        {
            value: defaultValues ? defaultValues.date.toString() : "",
            isValid: true,
        },
        description:
        {
            value: defaultValues ? defaultValues.description.toString() : "",
            isValid: true,
        },
    });

    function inputChangeHandler(inputIdentifier, enteredVal) {
        setInputVal((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: { value: enteredVal, isValid: true }
            }
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputVal.amount.value,
            date: new Date(inputVal.date.value),
            description: inputVal.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== "Invalid Date";
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputVal((curInputValues) => {
                return {
                    ...curInputValues,
                    amount: { value: curInputValues.amount.value, isValid: amountIsValid },
                    date: { value: curInputValues.date.value, isValid: dateIsValid },
                    description: { value: curInputValues.description.value, isValid: descriptionIsValid }
                }
            })
            return;
        }
        onSubmit(expenseData);

    }

    const formIsInvalid = !inputVal.amount.isValid || !inputVal.date.isValid || !inputVal.description.isValid;
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputRows}>
                <Input
                    styling={styles.rowInput}
                    invalid={!inputVal.amount.isValid}
                    label="Amount"
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangeHandler.bind(this, "amount"),
                        value: inputVal.amount.value
                    }} />
                <Input
                    styling={styles.rowInput}
                    label="Date"
                    invalid={!inputVal.date .isValid}

                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, "date"),
                        value: inputVal.date.value
                    }}
                />
            </View>
            <Input
                invalid={!inputVal.description.isValid}
                label="Description"
                textInputConfig={{
                    multiline: true,
                    // autoCapitalize: "none",
                    // autoCorrect: false,
                    onChangeText: inputChangeHandler.bind(this, "description"),
                    value: inputVal.description.value
                }} />
            {formIsInvalid && <Text style={styles.errorText}>Invalid Input Values - please check your data</Text>}
            <View style={styles.buttons}>
                <Button style={styles.button} mode={"flat"} onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    )
}
export default ExpenseForm;

const styles = StyleSheet.create({
    inputRows: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowInput: {
        flex: 1,
    },
    form: {
        margin: 18
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginVertical: 24,
        textAlign: "center"
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    errorText: {
        textAlign: "center",
        color: "red",
        margin: 8
    }
})