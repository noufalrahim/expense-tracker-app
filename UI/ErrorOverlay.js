import { View, Text, StyleSheet } from "react-native";
import Button from "./Buttons";

function ErrorOverlay({message, onConfirm}) {
    return (
        <View style={style.container}>
            <Text style={[style.text, style.title]}>An error occured</Text>
            <Text style={style.text}>{message}</Text>
            <Button onPress={onConfirm}>Okay</Button>
        </View>
    )
}

export default ErrorOverlay;

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "white"
    },
    text: {
        textAlign: "center",
        marginBottom: 8
    },
    title:{
        fontSize: 20,
        fontWeight: "bold",
    },
    message: {
        fontSize: 14,
    }
})