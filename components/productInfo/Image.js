import { View, Image, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Images({ images }) {
  const [activeImage, setActiveImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(images, "from images");
  useEffect(() => {
    setActiveImage(images[0].url);
    setIsLoading(false);
  }, [images]);

  return (
    <>
      {!isLoading && (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: activeImage }} style={styles.image} />
          </View>
          <View style={styles.previewContainer}>
            {images.map((image, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  setActiveImage(image.url);
                }}
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
              >
                <Image
                  source={{ uri: image.url }}
                  style={[
                    styles.imagePreview,
                    {
                      borderWidth: activeImage === image.url ? 3 : 0,
                    },
                  ]}
                />
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6af2e",
    paddingBottom: wp("10%"),
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
    width: "100%",
  },
  imageContainer: {
    padding: "20",
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: wp("80%"),
    height: wp("80%"),
    objectFit: "contain",
  },
  previewContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: wp("-10%"),
  },

  imagePreview: {
    width: wp("15%"),
    marginRight: wp("5%"),
    borderColor: "#000080",
    borderRadius: 10,
    height: wp("15%"),
  },
});
