import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { SinglePropertyContext } from "../../store/context/single-property-context";
export const SLIDER_WIDTH = Dimensions.get("window").width;

export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
function PropertyList() {
  const { singleProperty, setSingleProperty } = useContext(
    SinglePropertyContext
  );

  const [quote, setQuote] = useState("");
  const [property, setProperty] = useState("");
  const navigation = useNavigation();
  function onPressHandler(itemData) {
    setSingleProperty(itemData);
    //console.log(itemData.zpid);
    setProperty(itemData.zpid);
    navigation.navigate("PropertyDetail", {property});
  }

  // Get property list
  useEffect(() => {
    const options = {
      headers: {
        "x-rapidapi-key": "4b92feb3b8msh0a5732fe126632bp146e2ajsn989f926e9fc2",
        "x-rapidapi-host": "zillow-com1.p.rapidapi.com",
      },
      params: {
        location: "Glen Mills, PA",
        status_type: "ForSale",
        home_type: "Houses",
      },
    };
    axios
      .get("https://zillow-com1.p.rapidapi.com/propertyExtendedSearch", options)
      .then((response) => {
        if (response.data) {
          setQuote(response.data.props.sort((a, b) => a.price - b.price));
          //console.log(response.data.props[0]);
          //console.log(typeof response.data.data);

          //console.log(response.data.props[0]);
        } else {
          console.log("No quote found in response");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);
  //
  useEffect(() => {
    if (property) {
      getPropertyDetails();
    }
  }, [property]);

  
 

  return (
    <FlatList
      style={styles.container}
      data={quote}
      renderItem={({ item, index }) => (
        <Pressable
          style={styles.card}
          onPress={() => {
            onPressHandler(item);
          }}
        >
          <View>
            <SafeAreaProvider>
              <SafeAreaView>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.imgSrc,
                  }}
                />
              </SafeAreaView>
            </SafeAreaProvider>
          </View>

          <View style={styles.cardDescription}>
            <Text style={styles.priceText}>
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumSignificantDigits: 3,
              }).format(item.price)}
            </Text>
            <View style={styles.cardItem}>
              <Text style={styles.bedAndBathText}>{item.bedrooms}</Text>
              <Text style={styles.cardItemText}>bds</Text>
              <Text style={styles.cardItemText}>|</Text>
              <Text style={styles.bedAndBathText}>{item.bathrooms}</Text>
              <Text style={styles.cardItemText}>ba</Text>
              <Text style={styles.cardItemText}>|</Text>
              <Text style={styles.cardItemText}>{item.livingArea} sqft</Text>
              <Text style={styles.cardItemText}>|</Text>
              <Text style={styles.cardItemText}>
                {item.propertyType}_{item.listingStatus}
              </Text>
            </View>

            <Text style={styles.addressText}>
              {item.address}
              {item.city}
              {item.state}
              {item.zipcode}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
}
export default PropertyList;
const styles = StyleSheet.create({
  image: {
    width: ITEM_WIDTH * 0.95,
    height: 200,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  addressText: {
    marginTop: 5,
    marginBottom: 5,
  },
  card: {
    flex: 1,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "white",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    opacity: 1,
  },
  cardItem: {
    flexDirection: "row",
    marginTop: 5,
  },
  cardDescription: {
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 2,
  },
  bedAndBathText: {
    margin: 2,
    fontWeight: "bold",
  },
  cardItemText: {
    margin: 2,
  },
  priceText: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 22,
  },
});
