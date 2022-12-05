import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { A } from '@expo/html-elements';
import SteamImage  from "./assets/steamImage.jpg";
import * as SplashScreen from 'expo-splash-screen';




SplashScreen.preventAutoHideAsync();



function Add({ navigation }) {
  const [gameName, setGameName] = useState("");
  const [reviewScore, setReviewScore] = useState(0);
  const [review, setReview] = useState("");

  //  const [reviews, setReviews] = useState(
  //    {GameName: "" , GameScore: 0, uReview: "" }
  //  );

  return (
    //closes keyboard
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <View style={styles.container} >
        <Text style={styles.GameNameText}>Game Name:</Text>
        <TextInput style={styles.GameNameInput}
          placeholder='Game Name'
          value={gameName}
          onChangeText={gameName => setGameName(gameName)}
        />
        <Text style={styles.GameScoreText}>Game Score:</Text>
        <Picker
          style={styles.GameScorePicker} itemStyle={styles.onePickerItem}
          selectedValue={reviewScore}
          onValueChange={reviewScore => setReviewScore(reviewScore)}
        >
          <Picker.Item label="0" value={0} />
          <Picker.Item label="1" value={1} />
          <Picker.Item label="2" value={2} />
          <Picker.Item label="3" value={3} />
          <Picker.Item label="4" value={4} />
          <Picker.Item label="5" value={5} />
          <Picker.Item label="6" value={6} />
          <Picker.Item label="7" value={7} />
          <Picker.Item label="8" value={8} />
          <Picker.Item label="9" value={9} />
          <Picker.Item label="10" value={10} />
        </Picker>
        <Text style={styles.GameReviewText}>Game Review:</Text>
        <TextInput style={styles.GameReviewInput}
          multiline={true}
          placeholder="Enter Review"
          value={review}
          onChangeText={review => setReview(review)}
        />

        <TouchableOpacity style={styles.AddReviewButton}
          onPress={() => {
            //Passes Params to reviews page
            navigation.navigate('Reviews',
              {
                gameName,
                reviewScore,
                review
              },
              //clears form
              setGameName(""),
              setReview(""),
              setReviewScore(0)
            );
          }}>
          <Text style={styles.AddButtonText}>Add Review</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

function ReviewList({ route, navigation }) {
  if (route.params == null) {
    //return blank for now because no database to pull info from
    //no high low because no database
    return (
      <View style={styles.container}>
        <Image source={SteamImage} style={styles.image}></Image>
        <A style={styles.link} href="https://store.steampowered.com/">Go to Steam</A>
      </View>
    )
  } else {
    const { gameName } = route.params;
    const { reviewScore } = route.params;
    const { review } = route.params;
    let aReview = "";
    aReview = review
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.reviewClick}
          onPress={() =>
            //custom alert title
            Alert.alert("Review", aReview, [{ text: "Ok" }])
          }
        >
          <Text style={styles.reviewGameName}>{gameName}</Text>
          <Text style={styles.reviewGameScore}>{reviewScore}</Text>
        </TouchableOpacity>
        <A style={styles.link} href="https://store.steampowered.com/"><Text style={styles.linkText}>Go to Steam</Text></A>
      </View>
    );
  }
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    //need to pick icons for nav
    <Tab.Navigator>
      <Tab.Screen name="Add Review" component={Add} />
      <Tab.Screen name="Reviews" component={ReviewList} />
    </Tab.Navigator>
  );
}


export default function App() {
  React.useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync(); 
    }, 2000);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Video Game Reviews'
          component={Tabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'light grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  GameNameText: {
    position: "absolute",
    top: 50,
    left: 50,
    fontSize: "30px",
  },
  GameNameInput: {
    position: "absolute",
    top: 90,
    left: 50,
    borderColor: "grey",
    borderWidth: 1,
    height: 40,
    width: 300,

  },
  GameScorePicker: {
    width: 60,
    height: 44,
    borderColor: 'black',
    borderWidth: 1,
    position: "absolute",
    top: 140,
    left: 290,

  },
  onePickerItem: {
    height: 44,
  },
  GameScoreText: {
    position: "absolute",
    top: 140,
    left: 50,
    fontSize: "30px",
  },
  GameReviewText: {
    position: "absolute",
    top: 200,
    left: 50,
    fontSize: "30px",
  },
  GameReviewInput: {
    position: "absolute",
    top: 240,
    left: 50,
    borderColor: "grey",
    borderWidth: 1,
    height: 300,
    width: 300,
  },
  AddReviewButton: {
    position: "absolute",
    top: 570,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "red",
    height: 35,
    width: 100,
    textAlign: 'center'
  },
  AddButtonText: {
    position: "absolute",
    left: 12,
    top: 8
  },
  reviewClick: {
    position: "absolute",
    top: 100,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "white",
    height: 75,
    width: 350
  },
  reviewGameName: {
    position: "absolute",
    top: 20,
    left: 10,
    fontSize: "30px",
  },
  reviewGameScore: {
    position: "absolute",
    top: 20,
    left: 300,
    fontSize: "30px",

  },
  link: {
    position: "absolute",
    top: 575,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 10,
    backgroundColor: "blue",
    color: "white",
    height: 30,
    width: 100,
    textAlign: 'center',
  },
  linkText: {
    position: "absolute",
    top: 30,
  },
  image: {
    position: "absolute",
    top: 100,
    left: 50,
    height: 325,
    width: 300
  },
  images: {
    position: "absolute",
    height: 480,
    width: 500,
    left: 35,
    top: 100,

  },
});
