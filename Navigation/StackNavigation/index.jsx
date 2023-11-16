import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "../BottomTabs/index";
import Login from "../../screens/Login";

const Stack = createNativeStackNavigator();
function Navigation(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
                <Stack.Screen name="Main" component={BottomTabs} options={{headerShown:false}}/>
                

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation



