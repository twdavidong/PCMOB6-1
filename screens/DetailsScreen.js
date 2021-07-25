import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { commonStyles, lightStyles, darkStyles } from "../styles/commonStyles";
import axios from "axios";
import { API, API_POSTS } from "../constants/API";
import { useSelector } from "react-redux";
import background from "../assets/image.jpg"
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ShowScreen({ navigation, route }) {

//  const [post, setPost] = useState(route.params.post);
  const [post, setPost] = useState({title: "", content: ""});

//  const[refreshing, setRefreshing]=useState(false);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...isDark ? darkStyles : lightStyles };
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={editPost} style={{marginRight: 10}}>
          <FontAwesome name="pencil-square-o" size={30} color={styles.headerTint} />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    getPost();
  },[])

  async function getPost() {

//    const token = await AsyncStorage.getItem("token");
    const id = route.params.id
    console.log ("Getting " + id)

    try {
      const response = await axios.get(API + API_POSTS + "/" + id, {
        headers: { Authorization: `JWT ${token}` },
      })
      console.log(response.data);
      setPost(response.data);
      
    } catch (error) {
      console.log (error.response.data);
      
      if (error.response.data.error = "Invalid token") {
        navigation.navigate("SignInSignUp");
      }
    }
  }

  function editPost() {
    navigation.navigate("Edit", {post: post})
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={background} resizeMode="cover" style={styles.image}>
        <Text style = {[styles.title, styles.text, {margin : 40}]}>{post.title}</Text>
        <Text style = {[styles.content, styles.text, {margin : 100}]}>{post.content}</Text>
      </ImageBackground>
    </View>
  );
}