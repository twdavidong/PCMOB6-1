import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { commonStyles, lightStyles, darkStyles } from "../styles/commonStyles";
import { FontAwesome } from "@expo/vector-icons";                   
import { useDispatch, useSelector } from "react-redux";
import { uploadPicAction } from '../redux/ducks/accountPref';

export default function CameraScreen({navigation}) {
    
  const cameraRef = useRef(null);  //
  const isDark = useSelector((state) => state.accountPrefs.isDark); //
  const styles = isDark ? darkStyles : lightStyles //
  const [hasPermission, setHasPermission] = useState(null); //
  const [back, setBack] = useState(true); //
  //const styles = { commonStyles, ...isDark ? darkStyles : lightStyles};
  const dispatch = useDispatch(); //

  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

async function showCamera() {
   const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
     if (hasPermission === false) {
        Alert.alert("No access to camera")
      }
}

function flip () {
  setBack(!back)
}

async function takePicture() {
  const photo = await cameraRef.current.takePictureAsync()
  console.log(photo)
  dispatch({...dispatch(uploadPicAction()), payload: photo})
  navigation.navigate("Account")
}

useEffect(() => {
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={flip}>
        <FontAwesome name = "refresh" size={24} style = {{ color : styles.headerTint, marginRight: 15}} />
      </TouchableOpacity>
    ),
  });
});

useEffect(() => {
  showCamera()  
}, [])


  return (
    <View style = {{flex: 1}}>
      <Camera style = {additionalStyles.camera}
        type= {back ? Camera.Constants.Type.back : Camera.Constants.Type.font} ref={cameraRef}> 
          <View style = {additionalStyles.innerView}>
            <View style = {additionalStyles.buttonView}>
              <TouchableOpacity onPress = {takePicture}
                style = {[additionalStyles.circleButton, {backgroundColor : isDark ? "black" : "white"}]} 
              />
            </View>
          </View>
      </Camera>
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