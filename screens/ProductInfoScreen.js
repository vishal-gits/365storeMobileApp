import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "../components/productInfo/Image";
import baseURL from "../constants/url";
import MetaInfo from "../components/productInfo/MetaInfo";

import { Ionicons } from "@expo/vector-icons";

export default function ProductInfoScreen({ route, navigation: { navigate } }) {
  const { productId } = route.params;
  // console.log(productId);
  const [productInfo, setproductInfo] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/store/products/${productId}`).then((res) => {
      // console.log(res.data.product.images, "from ProductInfoScreen");
      setproductInfo(res.data.product);
    });
  }, [productId]);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigate("StoreScreen")}>
        <Ionicons
          style={styles.icon}
          name="arrow-back-outline"
          size={24}
          color="black"
        />
      </Pressable>
      <ScrollView>
        {productInfo && (
          <View>
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
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  icon: {
    marginLeft: 10,
  },
});
