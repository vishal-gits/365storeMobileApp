import { FlatList, Pressable } from "react-native";
import EmptyCard from "../EmptyCard";
import { useNavigation } from "@react-navigation/native";
import ProductCardHome from "./ProductCardHome";

const ProductListHome = ({ products }) => {
  const productLength = products.length;
  // console.log(productLength);
  const navigation = useNavigation();
  return (
    <>
      {productLength > 0 ? (
        <FlatList
          data={products}
          numColumns={2}
          key={2}
          renderItem={({ item }) => {
            return (
              <Pressable
                key={item.id}
                onPress={() => {
                  // console.log(item.id);
                  navigation.navigate("Store", {
                    screen: "ProductInfo",
                    params: { productId: item.id },
                  });
                }}
              >
                <ProductCardHome product={item} productLength={productLength} />
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
export default ProductListHome;
