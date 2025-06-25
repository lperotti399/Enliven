import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";

function Map() {
  const [markers, setMarkers] = useState("");
  const [quote, setQuote] = useState("");
  //console.log(quote[0].latitude + ", " + quote[0].longitude);
  // console.log(quote[0]);
  // move this into a button so you are not rerending every reload

  // move this into a button so you are not rerending every reload
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
          setQuote(response.data.props[0].sort((a, b) => a.price - b.price));
          setMarkers(
            quote.map((marker) => ({
              longitude: marker.longitude,
              latitude: marker.latitude,
            }))
          );
          console.log(markers);

          //console.log(typeof response.data.data);
          console.log(
            quote.map((marker, index) => ({
              latitude: marker.latitude,
              longitude: marker.longitude,
            }))
          );
        } else {
          console.log("No quote found in response");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);
  console.log(markers);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          //latitude: Math.round(quote[0].latitude * 10000) / 10000,
          latitude: 39.8565,
          longitude: -75.5416,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {markers &&
          //markers.length > 0 &&
          markers[0].map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            >
              <View style={{ width: 40, height: 40 }}>
                <Text>100</Text>
              </View>
            </Marker>
          ))}
      </MapView>
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
