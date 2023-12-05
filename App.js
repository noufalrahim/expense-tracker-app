import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageExpenses from './Screens/ManageExp';
import RecentExpenses from './Screens/RecentExp';
import AllExpenses from './Screens/AllExpenses';
import { Ionicons } from "@expo/vector-icons"
import IconBtn from './UI/IconButton';
import ExpensesContextProvider from './Store/expenses-context';
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (

    <BottomTabs.Navigator screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: "black" },
      headerTintColor: "white",
      tabBarStyle: {backgroundColor: "white"},
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "grey",
      tabBarActiveBackgroundColor: "black",
      tabBarInactiveBackgroundColor: "black",
      headerRight: () =>
        <IconBtn
          icon={"add"}
          size={24}
          color={"white"}
          onPress={() => {
            navigation.navigate("Manage Expenes")
          }} />
    })}>
    <BottomTabs.Screen name='RecentExpenses' component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: (({color, size}) => <Ionicons name='hourglass' size={size} color={color} />
          ),
        }}
      />

      <BottomTabs.Screen name='All Expenses' component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: (({color, size}) => <Ionicons name='calendar' size={size} color={color} />)
        }}
      />
      

    </BottomTabs.Navigator>
  )
}
export default function App() {
  return (
    <><StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",

          }}>
            <Stack.Screen name='Expenes Overview' component={ExpensesOverview} options={{
              headerShown: false
            }} />
            <Stack.Screen name='Manage Expenes' component={ManageExpenses}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({

});
