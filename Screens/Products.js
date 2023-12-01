import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { AddToCart } from "../Slices/CartReducer";
import { useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Products = (props) => {
  // const [cartCount, setCartCount] = useState(0);
  const dispatch = useDispatch();

  const AddItemToCart = (item) => {
    dispatch(AddToCart(item));
  };
  const cartCount = useSelector((state) => state.cart.cart.length);
  // console.log(cart);

  const [quantity, setQuantity] = useState(1);

  const item = props.route.params;

  const navigation = useNavigation();

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
    console.log(quantity);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <AntDesign name="arrowleft" size={35} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.coffeeImage} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.coffeeName}>{item.name}</Text>
          <View style={styles.starContainer}>
            <Feather name="star" size={24} color="gold" />
            <Text style={styles.starText}>{item.reviews}</Text>
          </View>
        </View>

        <View style={styles.aboutContainer}>
          <Text style={styles.aboutText}>Description</Text>
          <Text style={styles.aboutDescription}>
            {" "}
            <MaterialCommunityIcons
              name="food-takeout-box-outline"
              size={24}
              color="black"
            />
            {item.discr}
          </Text>
        </View>
        <View style={{padding:'10px'}}>
        <Text style={styles.coffeePrice}>R {item.price}</Text>
        </View>
        <View>
        <View style={{ justifyContent: "flex-end",alignItems: "flex-end", paddingRight:'5%'}}>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate("Cart", { ...item })}
          >
            <AntDesign name="shoppingcart" size={36} color="orange" />
            {cartCount > 0 && (
              <View style={styles.cartCountContainer}>
                <Text style={styles.cartCountText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        </View>
        </SafeAreaView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            // paddingTop:"190px",
            // marginTop:"-50px"
          }}
        >
          <TouchableOpacity
            style={styles.buyNowButton}
            onPress={() => AddItemToCart(item)}
          >
            <Text style={styles.buyNowText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40,
    paddingTop: 30,
  },
  backgroundImage: {
    height: 300,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    width: "100%",
    position: "absolute",
  },
  safeArea: {
    flex: 1,
    // backgroundColor:'pink'
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    position: "absolute",
    top: 30,
    zIndex: 20,
  },
  backButton: {
    borderRadius: 8,
    padding: 10,
  },
  heartButton: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
  },
  imageContainer: {
    width: "100%",
    height: "50%",
  },
  coffeeImage: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
  starContainer: {
    justifyContent: "row",
    alignItems: "center",
    backgroundColor: "black",
    width: 50,
    borderRadius: 5,
    paddingRight: 10,
  },
  starBackground: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    paddingHorizontal: 12,
  },
  starText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginLeft: 4,
    flexDirection: "row",
  },
  infoContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  coffeeName: {
    color: "#333",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
  },
  coffeePrice: {
    color: "#555",
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 20,
    paddingHorizontal: 10,
    marginTop: 16,
  },
  aboutContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  aboutText: {
    color: "#333",
    fontSize: 20,
    fontWeight: "bold",
  },
  aboutDescription: {
    color: "#666",
    marginTop: 8,
    fontSize: 20,
  },
  quantityContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "flex-end",
  },
  volumeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  volumeTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  volumeLabelText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 4,
  },
  volumeText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  buyButtonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingLeft: "-190px",
  },
  cartButton: {
    padding: 16,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: "#d5a12e",
    width: "18%",
    height: "15px",
    justifyContent:'flex-end',
   
  },
  buyNowButton: {
    backgroundColor: "orange",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    width:"50%",
    
  
  },
  buyNowText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  cartCountContainer: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  cartCountText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
