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
import { ActivityIndicator } from "react-native";

export default function ProductInfoScreen({ route, navigation: { navigate } }) {
  const { productId } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [productInfo, setproductInfo] = useState(null);
  const [isAddingCart, setIsAddingCart] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseURL}/store/products/${productId}`)
      .then((res) => {
        setproductInfo(res.data.product);
      })
      .then(() => setIsLoading(false));
  }, [productId]);

  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="100" color="red" />
        </View>
      ) : (
        <SafeAreaView>
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
            {/* {isAddingCart && (
              <View
                style={{
                  height: "100%",
                  flex: 1,
                  margin: 100,
                }}
              >
                <ActivityIndicator size="100" color="red" />
                <Text
                  style={{ color: "red", fontSize: 24, textAlign: "center" }}
                >
                  Loading ....
                </Text>
              </View>
            )} */}
            {productInfo && (
              <View style={styles.scrollView}>
                {<Images images={productInfo.images} />}

                <MetaInfo
                  product={productInfo}
                  isAddingCart={isAddingCart}
                  setIsAddingCart={setIsAddingCart}
                />
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      )}
    </>
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
