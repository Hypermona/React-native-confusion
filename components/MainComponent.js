import React, { Component } from "react";
import { View } from "react-native";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

class Main extends Component {
  render() {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Menu} />
          <Stack.Screen
            name="Dishdetail"
            component={Dishdetail}
            options={{ title: "Dish details.." }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default Main;
