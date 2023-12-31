import { View, ActivityIndicator, StyleSheet } from "react-native";

function LoadingOverlay() {
    return (
        <View style={style.container}>
            <ActivityIndicator size="large" color="black" />
        </View>
    )
}

export default LoadingOverlay;

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "white"
    }
})