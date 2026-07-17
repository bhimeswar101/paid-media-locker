import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import UploadScreen from "../screens/Upload/UploadScreen";
import MediaDetailsScreen from "../screens/Home/MediaDetailsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Upload"
          component={UploadScreen}
        />

        <Stack.Screen
          name="MediaDetails"
          component={MediaDetailsScreen}
          options={{ title: "Media Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}