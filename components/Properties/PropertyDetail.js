import { View, Text, StyleSheet } from "react-native";
import { SinglePropertyContext } from "../../store/context/single-property-context";
import { useContext } from "react";
import { SinglePropertyContext } from "../../store/context/single-property-context";

function PropertyDetail() {
  const [property, setProperty] = useState("");

  const { singleProperty, setSingleProperty } = useContext(
    SinglePropertyContext
  );
  console.log(singleProperty.address.streetAddress);

  //Get single property details
  const getPropertyDetails = () => {
    const options = {
      headers: {
        "x-rapidapi-key": "4b92feb3b8msh0a5732fe126632bp146e2ajsn989f926e9fc2",
        "x-rapidapi-host": "zillow-com1.p.rapidapi.com",
      },
      params: {
        zpid: property,
      },
    };
    axios
      .get("https://zillow-com1.p.rapidapi.com/property", options)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
        } else {
          console.log("No quote found in response");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <View style={styles.root}>
      <Text>This is the property screen</Text>
      <Text>This is the property screen</Text>
      <Text>This is the property screen</Text>
      <Text>This is the property screen</Text>
      <Text>This is the property screen</Text>
    </View>
  );
}

export default PropertyDetail;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
