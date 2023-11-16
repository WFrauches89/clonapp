import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest } from 'expo-auth-session';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const Login = () =>{ 
//     const navigation = useNavigation();
//     useEffect(() => {
//       const checkTokenValidity = async () => {
//         const accessToken = await AsyncStorage.getItem("token");
//         const expirationDate = await AsyncStorage.getItem("expirationDate");
//         console.log("acess token",accessToken);
//         console.log("expiration date",expirationDate);
  
//         if(accessToken && expirationDate){
//           const currentTime = Date.now();
//           if(currentTime < parseInt(expirationDate)){
//             // here the token is still valid
//             navigation.replace("Main");
//           } else {
//             // token would be expired so we need to remove it from the async storage
//             AsyncStorage.removeItem("token");
//             AsyncStorage.removeItem("expirationDate");
//           }
//         }
//       }
  
//       checkTokenValidity();
//     },[])
//     async function authenticate ()  {
//       const config = {
//         issuer:"https://accounts.spotify.com/api/token",
//         clientId:"8379fef3987f4ffbb8d468a86fabde59",
//         scopes: [
//           "user-read-email",
//           "user-library-read",
//           "user-read-recently-played",
//           "user-top-read",
//           "playlist-read-private",
//           "playlist-read-collaborative",
//           "playlist-modify-public" // or "playlist-modify-private"
//         ],
//         redirectUrl:"exp://192.168.1.66:8081/--/spotify-auth-callback"
//       }
//       const result = await useAuthRequest(config);
//       console.log(result);
//       if(result.accessToken){
//         const expirationDate = new Date(result.accessTokenExpirationDate).getTime();
//         AsyncStorage.setItem("token",result.accessToken);
//         AsyncStorage.setItem("expirationDate",expirationDate.toString());
//         navigation.navigate("Main")
//       }
//       console.log(result.accessToken)
//     }
  

const Login = () => {
    const navigation = useNavigation();

    WebBrowser.maybeCompleteAuthSession();

    // Endpoint
    const discovery = {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
    };

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: '8379fef3987f4ffbb8d468a86fabde59',
            scopes: ["user-read-email",
                        "playlist-modify-public",
                        "user-read-recently-played",
                        "user-top-read",
                        "playlist-read-private",
                        "playlist-read-collaborative",
                        "playlist-modify-public"],
            usePKCE: false,
            redirectUri: 'exp://192.168.1.66:8081/--/spotify-auth-callback',
        },
        discovery
    );

    useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            const valid = async () => {
                const accessToken = await AsyncStorage.getItem("token", response);
                const expirationDate = await AsyncStorage.getItem("expirationDate", response);
                console.log("access token",accessToken);
                console.log("expiration date",expirationDate);}
                alert('Acessando o Xboxfy - agora...')
                navigation.navigate("Main")
        }
    }, [response]);   
    //  useEffect(() => {
    //   const checkTokenValidity = async () => {
    //     const accessToken = await AsyncStorage.getItem("token");
    //     const expirationDate = await AsyncStorage.getItem("expirationDate");
    //     console.log("acess token",accessToken);
    //     console.log("expiration date",expirationDate);
  
    //     if(accessToken && expirationDate){
    //       const currentTime = Date.now();
    //       if(currentTime < parseInt(expirationDate)){
    //         // here the token is still valid
    //         navigation.replace("Main");
    //       } else {
    //         // token would be expired so we need to remove it from the async storage
    //         AsyncStorage.removeItem("token");
    //         AsyncStorage.removeItem("expirationDate");
    //       }
    //     }
    //   }
  
    //   checkTokenValidity();
    // },[])

    const handleSignInWithXboxfy = async () => {
        if (request) {
            await promptAsync();
        }
    };

    return (
        <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
            <SafeAreaView>
                <View style={{ height: 80, flexDirection: 'row' }} />
                <FontAwesome5 style={{ textAlign: 'center' }} name="xbox" size={80} color="#12831d" />
                <Text style={{
                    color: 'white',
                    fontSize: 50,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 40,
                }}> Millions of Songs Free on Xboxfy!</Text>

                <View style={{ height: 80 }} />
                <TouchableOpacity
                    name="sign-in-with-xboxfy"
                    onPress={handleSignInWithXboxfy}
                    style={{
                        backgroundColor: '#12831d',
                        padding: 10,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: 300,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 10,
                    }}>
                    <Text style={{ fontSize: 24, color: 'white' }}>Sign in with Xboxfy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        padding: 10,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: 300,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 10,
                        borderColor: '#C0C0C0',
                        borderWidth: 0.5,

                    }}>
                    <FontAwesome name="whatsapp" size={24} color="white" />
                    <Text style={{ fontSize: 24, color: 'white' }}>  Sign in with</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        padding: 10,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: 300,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 10,
                        borderColor: '#C0C0C0',
                        borderWidth: 0.5,

                    }}>
                    <FontAwesome name="google-plus-circle" size={24} color="#990505" />
                    <Text style={{ fontSize: 24, color: 'white' }}>  Sign in with  </Text>
                    <MaterialCommunityIcons name="google-downasaur" size={24} color="#990505" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        padding: 10,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: 300,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 10,
                        borderColor: '#C0C0C0',
                        borderWidth: 0.5,

                    }}>
                    <FontAwesome name="facebook-official" size={24} color="#1c27c0" />
                    <Text style={{ fontSize: 24, color: 'white' }}>  Sign in with  </Text>

                </TouchableOpacity>
                
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Login;


