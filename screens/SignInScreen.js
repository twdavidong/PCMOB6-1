import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

 const API = "https://repairaman.pythonanywhere.com";
 const API_LOGIN = "/auth";

export default function SignInScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  async function login() {
    console.log("---- Login time ----");
    Keyboard.dismiss();

    try {
      const response = await axios.post(API + API_LOGIN, {
        username,
        password,
      });
      console.log("Success logging in!");
      console.log(response);

      // Throwing token to AsyncStorage and navigate to AccountScreen
      await AsyncStorage.setItem("token", response.data.access_token);
      navigation.navigate("Account");

    } catch (error) {
      console.log("Error logging in!");
      console.log(error.response);

                                                                                                                                    setErrorText(error.response.data.description);
    }
  }
  const image = { uri: "../assets/image.jpg" };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>  <ImageBackground source={require('../assets/image.jpg')} style={styles.image}>
        <Text style={styles.title}>Sign in to Blog Test 6</Text>
        <Text style={styles.fieldTitle}>Username</Text>

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={(input) => setUsername(input)}
        />
        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the Magic Word"
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={(input) => setPassword(input)}
        />
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={login} style={styles.loginButton}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity
                onPress={() => {
                                  navigation.navigate("AccountScreen"); // Account
                                }
                        } style={styles.switchButton}
          >
          <Text style={styles.switchText}>Register for a new account</Text>
              </TouchableOpacity>

        <Text style={styles.errorText}>{errorText}</Text>

        <View style={{ height: 20, alignItems: "left"}}></View></ImageBackground>
      </View>


    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({  // ============ Styles ======================
  // Container ==================================
container: {
flex: 1,
justifyContent: 'space-around',
padding: 24,
},
  // Header ==================================
textHeader: {
marginBottom:10,
fontSize: 30,
fontWeight: 'bold',
color: '#4050D7',
},
  // Title ==================================
title: {            
marginBottom: 10,
fontSize: 30,
fontWeight: "bold",
color: '#D79940',
},
fieldTitle: {            
marginBottom: 10,
fontSize: 20,
fontWeight: "normal",
color: '#D79940',
},
titleContainer: {
backgroundColor: "orange",
padding: 10,
margin: 10,
flex: 0.5,
justifyContent: "center",
borderRadius: 20,
},
  // Filler & Background ==========================
fillerContainer:{
padding: 10,
backgroundColor: "blue",
flex: 0.25,
width: "50%",
},
image: {
  flex: 1,
  resizeMode: "cover",
  justifyContent: "center",
  width: '100%',
  height: '100%',
},                    
  // Input ==========================
arrivalTime: {      
marginBottom: 10,
fontSize: 20,
color: '#D79940',
},
input: {      
padding: 10,
borderWidth: 1,
marginBottom: 10,
fontSize: 20,
color: '#D79940',
},
  // Button ==============================
button: {             
marginBottom: 20,
borderRadius: 15,
backgroundColor: '#D740D0',
paddingVertical: 20,
paddingHorizontal: 80,
},
loginButton: {
fontSize: 40,
marginBottom: 20,
borderRadius: 15,
backgroundColor: '#D740D0',
paddingVertical: 20,
paddingHorizontal: 80,
},
textButton:{
fontSize: 30,
color: '#9ED740'
},
// Error =====================================
errorText: {
color: "red",
marginTop: 20,
marginLeft: 20,
marginRight: 20,
height: 40,
},
});