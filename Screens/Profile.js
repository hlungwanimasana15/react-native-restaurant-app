import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import setData from "../Slices/dataSlice";
import { auth, db } from "../firebase";
import defaultImg from "../assets/fast-food.webp";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  storage,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [loading, setIsLoading] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [userInfo, setUserInfo] = useState("");
  const [historyOrder, setHistoryOrder] = useState([]);
  const [historyOrder2, setHistoryOrder2] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const handleChooseImage = async () => {
    try {
      setIsLoading(true);
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      } else {
        alert("You did not select any image.");
      }
    } catch (error) {
      console.error("Error choosing image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchedData = [];

  const OrderHistory = async () => {
    try {
      console.log("user", user);
      const querySnapshot = query(
        collection(db, "orders"),
        where("userId", "==", user.uid)
      );

      const data = await getDocs(querySnapshot);

      let orders = [];
      let ordersDish = [];
      data.forEach((doc) => {
        console.log("doc.id", doc.data());
        //  fetchedData[doc.id] = doc.data();
        orders.push({ id: doc.id, ...doc.data() });
      });
      // console.log("dessssDWEDWQ", orders[0]);

      orders.forEach((doc, index) => {
        const dishArray = Object.values(doc.dish);
        ordersDish.push(dishArray);
      });
      console.log("dishArray", ordersDish);
      ordersDish[0].forEach((doc, index) => {
       console.log(doc.image);
      });
      setHistoryOrder(orders);
      setHistoryOrder2(ordersDish[0])
    } catch (error) {
      console.log("failed to get Starters");
    }
  };

  // console.log('OUTSIDEEEEEE',historyOrder );

  const EditUserInfo = async () => {
    try {
      if (user.uid) {
        const userCollection = collection(db, "usersInformation");
        const userDocRef = doc(userCollection, user.uid);
        // Create an object with the updated user information
        const updatedUser = {
          email: email,
          name: name,
          surname: surname,
          contact: contact,
          address: address,
          cardNumber: cardNumber,
          cardName: cardName,
        };
        await updateDoc(userDocRef, updatedUser);
        // Update the state to reflect the changes
        setUserDetails(updatedUser);
        console.log("User information updated successfully");
      }
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const fetchData = async () => {
    const userId = user.uid;

    if (userId) {
      try {
        const userCollection = collection(db, "usersInformation");
        const userDocRef = doc(userCollection, userId);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          console.log("userid", userId);
          const userData = userDocSnapshot.data();
          console.log("UserInfo:", userData);
          setUserInfo(userData);
        } else {
          console.log("Failed to get user infromation");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const clearAuthenticationData = async () => {
    try {
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.error("Error clearing authentication data:", error);
    }
  };

  const handleLogout = () => {
    clearAuthenticationData();
    navigation.navigate("Welcome");
  };
  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email || ""); // Use default value if email is undefined
      setName(userInfo.name || "");
      setSurname(userInfo.surname || "");
      setContact(userInfo.contact || "");
      setAddress(userInfo.address || "");
      setCardNumber(userInfo.cardNumber || "");
      setCardName(userInfo.cardName || "");
    }
  }, [userInfo]);

  // useEffect(() => {
  //   fetchData();
  //   const fetchOrderHistory = async () => {
  //     const currentUser = getAuth().currentUser;
  //     const uid = currentUser.uid;

  //     const db = getFirestore();
  //     const userRef = collection(db, "orders");
  //     const querySnapshot = await getDocs(
  //       query(userRef, where("uid", "==", uid))
  //     );

  //     querySnapshot.forEach((doc) => {
  //       const fetchedUserData = doc.data();
  //       setUserData(fetchedUserData);
  //       console.log("----------", fetchedUserData);
  //     });
  //   };
  //   fetchOrderHistory();
  // }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const dateFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const timeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  useEffect(() => {
    OrderHistory();
  }, []);

  // const renderItem = ({ item }) => {
  //   return (
  //     <View style={styles.cartItem}>
  //       <View>
  //         <Image
  //           source={{ uri: item.image }}
  //           style={{ width: 80, height: 80 }}
  //         />
  //       </View>
  //       <View style={{ marginLeft: -50 }}>
  //         <Text style={styles.itemName}>{item.name}</Text>
  //         <Text style={styles.itemPrice}>R{item.price}</Text>
  //       </View>
  //     </View>
  //   );
  // };

  return (
    <View style={styles.container} behavior="padding">
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: "white",
            height: "15%",
            width: "100%",
            paddingTop: -20,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 30,
                color: "orange",
                display: "flex",
                flexDirection: "row",
                padding: 10,
                paddingTop: 20,
                fontWeight: "bold",
              }}
            >
              Hi:{userInfo.name}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "black",
                padding: 10,
              }}
            >
              {currentDateTime.toLocaleDateString(undefined, dateFormatOptions)}{" "}
              {currentDateTime.toLocaleTimeString(undefined, timeFormatOptions)}
            </Text>
            <TouchableOpacity onPress={handleChooseImage}>
              <View
                style={{
                  marginTop: 20,
                  alignItems: "flex-end",
                  top: -75,
                  padding: 10,
                }}
              >
                {selectedImage && !loading && (
                  <Image
                    source={{ uri: selectedImage }}
                    style={{ width: 100, height: 100, borderRadius: 30 }}
                  />
                )}
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
                {!selectedImage && !loading && (
                  <Ionicons
                    name="md-person-circle-outline"
                    size={54}
                    color="black"
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: -30,
              paddingTop: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => OrderHistory()}
              style={{
                alignItems: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "orange",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <MaterialIcons name="history" size={24} color="orange" />
              <Text style={{ color: "orange" }}>History Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={handleFavorites}
              style={{
                alignItems: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "orange",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <MaterialIcons name="favorite-outline" size={24} color="orange" />
              <Text style={{ color: "orange" }}>Favorites</Text>
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={handleEditProfile}
              style={{
                alignItems: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "orange",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <AntDesign name="edit" size={24} color="orange" />
              <Text style={{ color: "orange" }}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.inputContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Your Details</Text>
          </View>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          ></TextInput>
          <TextInput
            placeholder="Surname"
            value={surname}
            onChangeText={(text) => setSurname(text)}
            style={styles.input}
          ></TextInput>
          <TextInput
            placeholder="Contact Number"
            value={contact}
            onChangeText={(text) => setContact(text)}
            style={styles.input}
          ></TextInput>
          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
            style={styles.input}
          ></TextInput>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          ></TextInput>
          <TextInput
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={(text) => setCardNumber(text)}
            style={styles.input}
          ></TextInput>
          <TextInput
            placeholder="Card Name"
            value={cardName}
            onChangeText={(text) => setCardName(text)}
            style={styles.input}
          ></TextInput>
        </View>
        <View style={styles.buttons}>
          <View style={{ width: "100%" }}>
            <TouchableOpacity
              onPress={() => EditUserInfo()}
              style={styles.button}
            >
              <Text style={styles.buttonOutlineText}>Save changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ }}>
          {historyOrder2.map((order, index) => (
            <View key={index} style={styles.cartItem}>
              <View>
                <Image
                  source={{ uri: order.image }}
                  style={{ width: 80, height: 80 }}
                />
              </View>
              <View style={{ marginLeft: 10}}>
                <Text style={styles.itemName}>{order.name}</Text>
                <Text style={styles.itemPrice}>R{order.price}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // justifyContent: "center",
    // alignItems: "center",
  },
  inputContainer: {
    width: "90%",
    marginTop: 15,
    // margin: 40,
    paddingLeft: 40,
    // height:160,
    // paddingVertical:10
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    height: 60,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderColor: "green",
    borderWidth: 2,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  buttonOutline: {
    backgroundColor: "white",
    borderColor: "#078f9",
    paddingLeft: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "red",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    fontWeight: "700",
    fontSize: 16,
    color: "green",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  buttons: {
    // flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 2,
    // padding: 15,
    // borderRadius: 5,
    alignItems: "center",
    width: "50%",
    // position: "absolute",
    // bottom: -150,
    left: "25%",
    marginTop: 30,
    // backgroundColor:'blue'
    paddingBottom: 150,
  },
  historyContainer: {
    backgroundColor: "white",
    padding: 16,
    paddingLeft: 10,
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 5,
  },
  logoutButton: {
    borderColor: "red",
    borderWidth: 2,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    // position: "absolute",
    // bottom: -80,
    // left: "20%",
  },
  buttonText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#ffa726",
    fontSize: 34,
    marginBottom: 16,
    fontWeight: "bold",
  },
  cartItem: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 16,
    // backgroundColor: "#000",
  },
  itemName: {
    fontSize: 16,
    paddingLeft:100,
    display:'flex',
     flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft:100,
    paddingTop:4
  },
});
export default Profile;
