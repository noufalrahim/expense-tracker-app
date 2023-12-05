import { FlatList,Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

function ExpList({expenses}){
    return (
        <FlatList data={expenses} renderItem={(itemData) => {
            return <ExpenseItem {...itemData.item}/>
        }} keyExtractor={(item) =>  item.id}/>

    )
}
export default ExpList;