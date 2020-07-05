import React, { Component } from "react";
import {
  View,
  Platform,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
} from "react-native";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import Dishdetail from "./DishdetailComponent";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import AboutUs from "./AboutComponent";
import ContactUs from "./ContactComponents";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import {
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from "../redux/ActionCreators";
import Reservation from "./ReservationComponent";
import Favorites from "./FavoriteComponent";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

function StackNavMenu() {
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
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              raised
              reverse
              name="menu"
              size={24}
              color="#512DA8"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
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
function StackNavHome() {
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
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              raised
              reverse
              name="menu"
              size={24}
              color="#512DA8"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
function StackNavAbout() {
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
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              raised
              reverse
              name="menu"
              size={24}
              color="#512DA8"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
function StackNavContact() {
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
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              raised
              reverse
              name="menu"
              size={24}
              color="#512DA8"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
function StackNavFav() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Favorites"
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
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              raised
              reverse
              name="menu"
              size={24}
              color="#512DA8"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
function StackNavReserve() {
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
      <Stack.Screen
        name="Reservation"
        component={Reservation}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              raised
              reverse
              name="menu"
              size={24}
              color="#512DA8"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
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
      drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={StackNavHome}
        options={{
          title: "Home",
          drawerLabel: "Home",
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name="home" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="AboutUs"
        component={StackNavAbout}
        options={{
          title: "About us",
          drawerLabel: "About us",
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name="info-circle"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Menu"
        component={StackNavMenu}
        options={{
          title: "Menu",
          drawerLabel: "Menu",
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name="list" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="ContactUs"
        component={StackNavContact}
        options={{
          title: "Contact us",
          drawerLabel: "Contact us",
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name="address-card"
              type="font-awesome"
              size={22}
              color={tintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={StackNavFav}
        options={{
          title: "Favorites",
          drawerLabel: "Favorites",
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name="heart"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Reservation"
        component={StackNavReserve}
        options={{
          title: "Reservation",
          drawerLabel: "Reservation",
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name="cutlery"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
const CustomDrawerContentComponent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <View style={styles.drawerHeader}>
          <View style={{ flex: 1 }}>
            <Image
              source={require("./images/logo.png")}
              style={styles.drawerImage}
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop:
            Platform.OS === "ios" || Platform.OS === "web"
              ? 0
              : Expo.Constants.statusBarHeight,
        }}
      >
        <NavigationContainer>
          <DrawerNav />
        </NavigationContainer>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#512DA8",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
