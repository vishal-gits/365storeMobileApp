import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "../components/productInfo/Image";
import baseURL from "../constants/url";
import MetaInfo from "../components/productInfo/MetaInfo";

import { Ionicons } from "@expo/vector-icons";

export default function ProductInfoScreen({ route, navigation: { goBack } }) {
  const { productId } = route.params;
  console.log();
  const [productInfo, setproductInfo] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/store/products/${productId}`).then((res) => {
      setproductInfo(res.data.product);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => goBack()}>
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
