import React, {useState, useEffect} from "react";
import { Button, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { lightStyles } from "../styles/commonStyles";
import axios from "axios";
import { API, API_WHOAMI } from "../constants/API";
import { useSelector } from "react-redux";

export default function AccountScreen({ navigation }) {
  
  const [username, setUsername] = useState(null);
  const styles = lightStyles;
  const token = useSelector((state) => state.auth.token)


  function signOut() {
    AsyncStorage.removeItem("token");
    navigation.navigate("SignInSignUp");
  }

  async function getUsername () {
    console.log("----Getting Username -----");
    console.log(`Token is ${token}`);
    
    try {
      const response = await axios.get(API + API_WHOAMI, {     // second await....
        headers: { Authorization: `JWT ${token}` },
      });
          console.log("Got the username!");
          setUsername(response.data.username);
          console.log(response);
    } catch (error) {
      console.log("Error getting user name!");
      if (error.response) {
        console.log(error.response.data);
        if (error.response.data.status_code === 401 ) {
          signOut();
          navigation.navigate("SignInSignUp")
        }
      } else {
        console.log(error);
      }
      navigation.navigate("SignInSignUp")   // to go back log in screen?
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