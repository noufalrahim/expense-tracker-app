import { View } from "react-native";
import { Pressable, StyleSheet, Text } from "react-native";

function Button({ children, onPress, mode, style }) {
    return (
        <View style={style}>
            <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
                <View style={[styles.button, mode === "flat" && styles.flat]}>
                    <Text style={[styles.buttonText, mode==="flat" && styles.flatText]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}
export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        padding: 8,
        backgroundColor: "black",
    },
    flat: {
        backgroundColor: "transparent"
    },
    buttonText:{
        color: "white",
        textAlign: "center",

    },
    flatText: {
        color: "black"
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: "black",
        borderRadius: 4,
    }
})