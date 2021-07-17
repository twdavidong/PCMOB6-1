import React, {useState, useEffect} from "react";
import { Button, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "https://repairaman.pythonanywhere.com";
const API_WHOAMI = "/whoami";


  export default function AccountScreen({ navigation }) {
  const [username, setUsername] = useState("");

  function signOut() {
    AsyncStorage.removeItem("token");
    navigation.navigate("SignIn");
  }

  async function getUsername () {
    console.log("----Getting Username -----");
    const token = await AsyncStorage.getItem("token");  // first await....
    if (token == null) {
      signOut();
      return;
    }
    console.log(`Token is ${token}`);
    
    try {
      const response = await axios.get(API + API_WHOAMI, {     // second await....
        headers: { Authorization: `JWT ${token}` },
      });
          console.log("Got the username!");
          console.log(response);
    } catch (error) {
      console.log("Error getting user name!");
      if (error.response) {
        console.log(error.response.data);
        if (error.response.data.status_code === 401 ) {
          signOut();
        }
      } else {
        console.log(error);
      }
      // to go back log in screen?
     }
  }

  return (
    <View style={commonStyles.container}>
      <Text>Account Screen</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({});