
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, UIManager, LayoutAnimation, Platform, ActivityIndicator, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { API, API_LOGIN, API_SIGNUP } from '../constants/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
} //Needs to be manually enabled for android

export default function SignInSignUpScreen({ navigation }) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorText, setErrorText] = useState('')

  const [isLogin, setIslogin] =useState(true)

  async function login() {
    console.log("---- Login time ----");
    Keyboard.dismiss();

    try {
      setLoading(true);
      const response = await axios.post(API + API_LOGIN, {
        username,
        password,
      });
      console.log("Success logging in!");
      // console.log(response);
      await AsyncStorage.setItem("token", response.data.access_token);
      setLoading(false);
      //setUsername("");
      //setPassword("");
      navigation.navigate("LoggedInTabStack");   // go to log in page if username and password are correct
    } catch (error) {
      setLoading(false);
      console.log("Salah logging in!");
      console.log(error);
      setErrorText(error.response.data.description);
      if (error.response.status = 404) {
        setErrorText("Salah! User does not exist")
      }
    }
  }

  async function signUp() {
    if (password != confirmPassword) {
      setErrorText("Your passwords don't match. Check and try again.")
    } else {
      try {
        setLoading(true);
        const response = await axios.post(API + API_SIGNUP, {
          username,
          password,
        });
        if (response.data.Error) {
          // We have an error message for if the user already exists
          setErrorText(response.data.Error);
          setLoading(false);
        } else {
          console.log("Success signing up!");
          setLoading(false);
          login();
        }
      } catch (error) {
        setLoading(false);
        console.log("Error logging in!");
        console.log(error.response);
        setErrorText(error.response.data.description);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isLogin ? "Log In" : "Sign Up"}
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Username:"
          placeholderTextColor="#003f5c"
          // value={username}
          onChangeText={(username) => setUsername(username)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Magicword:"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(pw) => setPassword(pw)}
        />
      </View>

      {isLogin ? <View/> :
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Magicword:"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(pw) => setConfirmPassword(pw)}
        />
      </View>}

      <View/>
      <View>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity style={styles.button} onPress={isLogin ? login : signUp}>
            <Text style={styles.buttonText}> {isLogin ? "Log In" : "Sign Up"} </Text>
          </TouchableOpacity>
          {loading ? <ActivityIndicator style={{ marginLeft: 10 }}/> : <View/>}
        </View>
      </View>
      <Text style={styles.errorText}>
        {errorText}
      </Text>
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext({
            duration: 700,
            create: { type: 'linear', property: 'opacity' },
            update: { type: 'spring', springDamping: 0.4 }
          });
          setIslogin(!isLogin);
          setErrorText("");
        }}>
          <Text style={styles.switchText}> {isLogin ? "No account? Sign up now." : "Already have an account? Log in here."}</Text>
      </TouchableOpacity> 
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40, 
    margin: 20
  },
  switchText: {
    fontWeight: '400',
    fontSize: 20, 
    marginTop: 20
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 25,
  },
  buttonText: {
    fontWeight: '400',
    fontSize: 20, 
    margin: 20,
    color: 'white'
  },
  errorText: {
    fontSize: 15,
    color: 'red',
    marginTop: 20
  },
  redirectlink: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  link: {
    color: 'blue'
  }
});


  /*    
  <View style={styles.redirectlink}>
    <Text>Don't have an account?</Text>
    <TouchableOpacity onPress={() => 
    this.props.navigation.navigate('SignUpScreen')}>
      <Text style={styles.link}>Sign Up</Text>
    </TouchableOpacity>
  </View> 
  */