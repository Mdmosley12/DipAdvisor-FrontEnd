import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AddLocationScreen from "../screens/AddLocationScreen";
import HomeScreen from "../screens/HomeScreen";
import MapViewScreen from "../screens/MapViewScreen";
import SingleLocationScreen from "../screens/SingleLocationScreen";
const Stack = createBottomTabNavigator();

const AuthenticatedStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          tabBarItemStyle: {
            display: route.name === "SingleLocationScreen" ? "none" : "flex",
          },
        })}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <FontAwesome name="home" size={24} color="black" />
            ),
          }}
        />
        <Stack.Screen
          name="View on Maps"
          component={MapViewScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <FontAwesome name="map" size={24} color="black" />
            ),
          }}
        />
        <Stack.Screen
          name="Add Swim Spot"
          component={AddLocationScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <MaterialIcons name="add-location" size={24} color="black" />
            ),
          }}
        />
        <Stack.Screen
          name="SingleLocationScreen"
          component={SingleLocationScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthenticatedStack;
