import { FlatList, StyleSheet, Pressable, View } from "react-native";
import EmptyCard from "../EmptyCard";
import ProductCard from "./ProductCard";
import { useNavigation } from "@react-navigation/native";

const ProductList = ({ products }) => {
  // console.log(products.length, "From ProductList");
  const navigation = useNavigation();
  return (
    <>
      {products.length > 0 ? (
        <FlatList
          style={styles.list}
          data={products}
          renderItem={({ item }) => {
            return (
              <Pressable
                key={item.id}
                onPress={() => {
                  // console.log(item.id);
                  navigation.navigate("ProductInfo", {
                    productId: item.id,
                  });
                }}
              >
                <ProductCard product={item} />
              </Pressable>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <EmptyCard message="No Products available for this search" />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#e6af2e",
    padding: 20,
    borderRadius: 10,
  },
});

export default ProductList;
