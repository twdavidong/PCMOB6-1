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
    <View style={commonStyles.container}><ImageBackground source={background} resizeMode="cover" style={styles.image}>
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
        </View></ImageBackground>
    </View>
  );
}

const additionalStyles = StyleSheet.create({
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
} 
);


