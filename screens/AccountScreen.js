import React, {useState, useEffect} from "react";
import { ActivityIndicator, TouchableOpacity, Text, View, Switch, Image, Animated, TouchableWithoutFeedback } from "react-native";
import { commonStyles, lightStyles, darkStyles } from "../styles/commonStyles";
import axios from "axios";
import { API, API_WHOAMI } from "../constants/API";
import { useSelector, useDispatch } from "react-redux";
import {  changeModeAction, deletePicAction } from '../redux/ducks/accountPref';
import { logoutAction } from "../redux/ducks/blogAuth";


export default function AccountScreen({ navigation }) {
  
  const [username, setUsername] = useState(null);
  
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const profilePicture = useSelector((state) => state.accountPrefs.profilePicture);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...isDark ? darkStyles : lightStyles };

 
  async function getUsername () {
    console.log("----Getting Username -----");
    console.log(`Token is ${token}`);
    
    try {
      const response = await axios.get(API + API_WHOAMI, {     
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

  function signOut() {
    dispatch(logoutAction())
    navigation.navigate("SignInSignUp");
  }

  function switchMode() {
    dispatch(changeModeAction())
  }

  useEffect(() => {
    console.log("Setting up Nav Listener");
    const removeListener = navigation.addListener("focus", () => {
      console.log("Running Nav Listener");
      setUsername(<ActivityIndicator />);
      getUsername();
    });
      getUsername();
      return removeListener;
    }, []);

  return (
    <View style={[styles.container, {alignItems: "center"}]}> 
      <Text style= {[styles.title, styles.text, { margin: 30}]}>Hi {username} !</Text>
        <Image source={{uri:profilePicture?.uri}} style={{width: 250, height: 250, borderRadius: 200}}/>
              <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
                <Text style={{ marginTop: 10, fontSize: 20, color: "#0000EE" }}> No profile picture. Click to take one.</Text>
              </TouchableOpacity>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: 20}}>
        <Text style={[styles.content, styles.text]}> Dark Mode? </Text>
          <Switch
              value={isDark}
              onChange={switchMode}/>
            </View>
      <TouchableOpacity style={[styles.button]} onPress={signOut}>
        <Text style={styles.buttonText}>
          Sign Out
        </Text>
        </TouchableOpacity>
    </View>  // End of return() View =========================================
  );
}