import React, {useState, useEffect} from "react";
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text, View, Switch, Image, Animated, TouchableWithoutFeedback } from "react-native";
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

const styles = StyleSheet.create({
  image: {
    flex:   1,
    justifyContent: "center"
  },
  baseText: {
      fontFamily: "Cochin-BoldItalic",
      fontSize: 40,
  },
  titleText: {
    fontSize: 50,
    fontWeight: "bold"
  },
  flatList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: "powderblue"
  },
  flatList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
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
          fontSize: 60,
          fontWeight: "bold",
          color: '#D79940',
  },
  fieldTitle: {            
      marginBottom: 10,
      fontSize: 60,
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
                      // Filler ==========================
  fillerContainer:{
          padding: 10,
          backgroundColor: "blue",
          flex: 0.25,
          width: "50%",
  },                    
                      // Input ==========================
  arrivalTime: {      
          marginBottom: 10,
          fontSize: 30,
          color: '#D79940',
  },
})

  const additionalStyles = StyleSheet.create({
    camera: {
      flex: 1,
    },
      circle: {
      height: 50,
      width: 50,
      borderRadius: 50,
    },
    circleButton: {
      width: 70,
      height: 70,
      bottom: 0,
      borderRadius: 50,
    },
    buttonView: {
      alignSelf: 'center',
      flex: 1,
      alignItems: 'center'
    },
    innerView: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      padding: 20,
      justifyContent: 'space-between'
    },
    input: {
      fontSize: 24,
      borderWidth: 1,
      borderColor: "black",
      marginBottom: 15,
    },
    label: {
      fontSize: 28,
      marginBottom: 10,
      marginLeft: 5
    }
  })