import { TextInput, StyleSheet } from "react-native";
import { View, Text } from "react-native";

function Input({label, invalid,  styling, textInputConfig}){

    const inputStyles = [style.input]
    if(textInputConfig && textInputConfig.multiline){
        inputStyles.push(style.inputMultiLine)

    }
    if(invalid){
        inputStyles.push(style.inValidInput)
    }
    return(
        <View style={[style.inputContainer, styling]}>
            <Text style={[style.label, invalid && style.inValidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig}/>
        </View>
    )
}
export default Input;

const style = StyleSheet.create({
    inputContainer: {
        marginVertical: 8,
        marginHorizontal: 4,
    },
    label: {
        fontSize: 12,
        color: "black",
        marginBottom: 4
    },
    input: {
        backgroundColor: "#cfcdc8",
        borderRadius: 6,
        padding: 6,

        fontSize: 18,
        color: "black",
        
    },
    inputMultiLine: {
        minHeight: 100,
        textAlignVertical: "top"
    },
    inValidLabel: {
        color: "red",

    },
    inValidInput:{
        backgroundColor: "#f9c0c0",
    }
})