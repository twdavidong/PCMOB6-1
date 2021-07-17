import React from "react";
import { StyleSheet, Text, View, RefreshControl, TouchableOpacity, FlatList, ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import { commonStyles, lightStyles } from "../styles/commonStyles";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API, API_POSTS } from "../constants/API";
import background from "../assets/image.jpg";

export default function IndexScreen({ navigation, route }) {

  const[post, setPost]=useState([]);
  const[refreshing, setRefreshing]=useState(false);
  const styles = lightStyles;

  useEffect(()  => {
    navigation.setOptions({
      headerRight:() => (
        <TouchableOpacity onPress = {addPost}>
          <FontAwesome name = "plus" size = {24} style={{color: styles.headerTint, marginRight: 15}} />          
        </TouchableOpacity>
      ),
    });

  }
  );

  useEffect(() => {
    getPosts();
  },[]);

  async function getPosts() {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await axios.get(API + API_POSTS, {
        headers: { Authorization: `JWT ${token}` },
      })
      console.log(response.data);
      setPost(response.data);
      return "completed"
    } catch (error) {
      console.log (error.response.data);
      if (error.response.data.error = "Invalid token") {
        navigation.navigate("SignInSignUp");
      }
    }
  }


async function onRefresh() {
  setRefreshing(true);
  const response = await getPosts()
  setRefreshing(false);
}

useEffect(() => {
  console.log("Setting up NAV Listerner");
  const removeListener = navigation.addListener("focus",()=> {
    console.log("Running Nav Listerner"); 
    getPosts();
    return removeListener;
  },[]);
})

  function addPost(){

  }

  function deletePost() {

  }

  function renderItem({item}) {
    return (
      <TouchableOpacity onPress={() => 
        navigation.navigate("Details",{post: item})}>
        <ImageBackground source={background} resizeMode="cover" style={styles.image}>
        <View style={{ 
          padding: 10,
          paddingTop: 10,
          paddingBottom: 10,
          borderBottomColor: "#a3a3a3",
          borderBottomWidth: 2,
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
          <Text style={styles.baseText}>{item.title}</Text>
          <TouchableOpacity onPress={deletePost}>
            <FontAwesome name= "trash" size={20} color ="#b800000" />
      </TouchableOpacity>
      </View></ImageBackground>
      </TouchableOpacity>
    );
  }

  return (
    <View style={commonStyles.container}>
      <FlatList
        data={post}
        renderItem={renderItem}
        style={{width:"100%"}}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl
          colors={["#c3ca5c","#689f38"]}
          refreshing={refreshing}
          onRefresh={onRefresh}/>
          }
        />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
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
});
