import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { commonStyles, lightStyles, darkStyles } from "../styles/commonStyles";
import { useState } from "react";
import axios from "axios";
import { API, API_CREATE } from "../constants/API";
import { useSelector } from "react-redux";
import background from "../assets/image.jpg";

export default function CreateScreen({ navigation }) {

const styles = { ...commonStyles, ...isDark ? darkStyles : lightStyles }
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const isDark = useSelector((state) => state.accountPrefs.isDark);
const token = useSelector((state) => state.auth.token);


async function savePost() {
  const post = {
    "title": title,
    "content": content, 
  }
  try {
    console.log(token);
    const response = await axios.post(API + API_CREATE, post, {
      headers: { Authorization: `JWT ${token}` }
    });
    console.log(response.data)
    navigation.navigate("Index", { post: post })
  } catch (error) {
    console.log(error)
  }
}

  return (
      <View style = {{margin: 20}}>
        <Text style = {[additionalStyles.label, styles.text]}>Enter Title:</Text>
          <TextInput style = {additionalStyles.input}
            value = {title}
            onChangeText = {text => setTitle(text)}
            />
        <Text style = {[additionalStyles.label, styles.text]}>Enter Content:</Text>
          <TextInput style = {additionalStyles.input}
            value = {content}
            onChangeText = {text => setContent(text)}
            />
          <TouchableOpacity style={[styles.button, {margin: 20}]} onPress={savePost}>
            <Text style= {styles.buttonText}>Save</Text>
            </TouchableOpacity>
        
    </View>
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