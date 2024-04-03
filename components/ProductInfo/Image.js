import { View, Image, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Images({ images }) {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    setActiveImage(images[0].url);
  }, []);

  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri: activeImage }} style={styles.image} />
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
  );
}

const styles = StyleSheet.create({
  image: {
    width: wp("100%"),
    height: wp("100%"),
  },
  previewContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: wp("-10%"),
  },
  imageContainer: {
    backgroundColor: "#F7F6FB",
    paddingBottom: wp("10%"),
  },
  imagePreview: {
    width: wp("15%"),
    marginRight: wp("5%"),
    borderColor: "#C37AFF",
    borderRadius: 10,
    height: wp("15%"),
  },
});
