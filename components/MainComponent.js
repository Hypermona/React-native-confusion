import React, { Component } from "react";
import { View } from "react-native";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import Dishdetail from "./DishdetailComponent";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

function StackNav() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{
          title: "Dish details..",
        }}
      />
    </Stack.Navigator>
  );
}
function DrawerNav() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerStyle={{
        backgroundColor: "#D1C4E9",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen
        name="Menu"
        component={StackNav}
        options={{
          title: "Menu",
          drawerLabel: "Menu",
        }}
      />
    </Drawer.Navigator>
  );
}
class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <DrawerNav />
      </NavigationContainer>
    );
  }
}
export default Main;
