import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useEffect, useState, useRef } from "react";
import { commonStyles, lightStyles, darkStyles } from "../styles/commonStyles";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { API, API_POSTS } from "../constants/API";
import { useSelector } from "react-redux";

export default function EditScreen({ navigation, route }) {

const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const isDark = useSelector((state) => state.accountPrefs.isDark);
const styles = { ...commonStyles, ...isDark ? darkStyles : lightStyles};
const token = useSelector((state) => state.auth.token);

useEffect(() => {
  const post = route.params.post
  setTitle(post.title);
  setContent(post.content);
},[])

async function editPost() {
  const post = {
    "title":  title,
    "content": content
  }

const id = route.params.post.id

try {
  console.log(token);
  const response = await axios.put(API + API_POSTS + "/" + id, post, 
  {headers: {Authorization: `JWT ${token}`},
})
  console.log(response.data)
  navigation.navigate("Index")
} catch (error) {
  console.log(error)
}}

  return (
    <View style={commonStyles.container}>
        <View style={{margin : 20}}>
          <Text style={[additionalStyles.label, styles.titleText]}>Input Title: </Text>
            <TextInput
              style = {additionalStyles.input}
              value = {title}
              onChangeText= {text => setTitle(text)}/>
            <Text style={[additionalStyles.label, styles.titleText]}>Input Content: </Text>
              <TextInput
                style = {additionalStyles.input}
                value = {content}
                onChangeText= {text => setContent(text)}/>
              <TouchableOpacity style={[styles.button, {margin : 20}]} onPress={editPost}>
                  <Text style = {styles.buttonText}>Save</Text>
              </TouchableOpacity>
        </View>
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
    }
  })