import { View, Text, Pressable, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const EmptyCart = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        <Text style={styles.text}>Cart</Text>
        <Text style={[styles.text, styles.number]}>0</Text>
        <Text style={styles.text}>Your Shopping bag is Empty </Text>
        <Pressable
          onPress={() =>
            navigation.navigate("Store", {
              screen: "StoreScreen",
            })
          }
          style={({ pressed }) => [
            styles.pressable,
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <Text style={styles.text}>Explore Products</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  container: {
    height: 400,

    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
  },
  number: {
    backgroundColor: "black",
    color: "white",
    padding: 10,
    borderRadius: 50,
  },
  pressable: {
    backgroundColor: "#e6af2e",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
});

export default EmptyCart;
