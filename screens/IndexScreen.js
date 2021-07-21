import React from "react";
import { StyleSheet, Text, View, RefreshControl, TouchableOpacity, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { lightStyles, darkStyles } from "../styles/commonStyles";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { API, API_POSTS } from "../constants/API";
import { useSelector } from "react-redux";

export default function IndexScreen({ navigation, route }) {

  const[posts, setPosts]=useState([]);
  const[refreshing, setRefreshing]=useState(false);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = isDark ? darkStyles : lightStyles;
  const token = useSelector((state) => state.auth.token);

  useEffect(()  => {
    navigation.setOptions({
      headerRight:() => (
        <TouchableOpacity onPress = {addPost}>
          <FontAwesome name = "plus" size = {24} style={{color: styles.headerTint, marginRight: 15}} />          
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    getPosts();
  },[]);

  useEffect(() => {
    console.log("Setting up NAV Listerner");
    const removeListener = navigation.addListener("focus",()=> {
      console.log("Running Nav Listerner"); 
      getPosts();
    });
      getPosts();
      return removeListener;
    },[]);

  async function getPosts() {
    // const token = await AsyncStorage.getItem("token");
    try {
      const response = await axios.get(API + API_POSTS, {
        headers: { Authorization: `JWT ${token}` },
      })
      console.log(response.data);
      setPosts(response.data);
      return "completed"
    } catch (error) {
      console.log (error.response.data);
      console.log (token)
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

  function addPost(){
    navigation.navigate("Add")
  }

  async function deletePost(id) {
    console.log ("Deleting " + id);
    try {
      const response = await axios.delete(API + API_POSTS + `/${id}`, {
        headers : { Authorization : `JWT ${token}` },
      })
      console.log(response);
      setPosts(posts.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error)
    }
  }

  const randomHexColor = (rgb) => {
      for (var i=2, col=''; i<6; i++) {
          col += (Math.random()*16|0).toString(16);
      }
      return '#'+col;
  }

  function renderItem({item}) {
    return (
      <TouchableOpacity onPress={() => 
        navigation.navigate("Details",{id : item.id})}>
       
        <View style={{ 
          padding: 10,
          paddingTop: 10,
          paddingBottom: 10,
          borderBottomColor: "#a3a3a3",
          flexDirection: "row",
          borderBottomWidth: 2,
          justifyContent: "space-between",
          backgroundColor: randomHexColor(),
        }}>
          <Text style={styles.baseText}>{item.title}</Text>
          <TouchableOpacity onPress={() => deletePost(item.id)}>
            <FontAwesome name= "trash" size={20} color ="#b80000" />
          </TouchableOpacity>
        </View>
        
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
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