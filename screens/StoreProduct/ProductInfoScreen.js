import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  StatusBar,
} from "react-native";
import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "../../components/productInfo/Image";
import baseURL from "../../constants/url";
import MetaInfo from "../../components/productInfo/MetaInfo";
import { Ionicons } from "@expo/vector-icons";

export default function ProductInfoScreen({ route, navigation: { navigate } }) {
  const { productId } = route.params;

  const [productInfo, setproductInfo] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/store/products/${productId}`).then((res) => {
      setproductInfo(res.data.product);
    });
  }, [productId]);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigate("StoreScreen")}>
        <View style={styles.header}>
          <Ionicons
            style={styles.icon}
            name="arrow-back-outline"
            size={24}
            color="black"
          />
          <Text style={styles.headerText}>Product Details</Text>
        </View>
      </Pressable>

      <ScrollView>
        {productInfo && (
          <View style={styles.scrollView}>
            <Images images={productInfo.images} />
            <MetaInfo product={productInfo} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
    justifyContent: "center",

    paddingTop: StatusBar.currentHeight - 20,
  },
  header: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingBottom: 10,
    // justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    paddingHorizontal: 5,
  },
});
