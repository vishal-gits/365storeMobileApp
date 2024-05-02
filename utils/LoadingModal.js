import { View, Text, StyleSheet, Modal, ActivityIndicator } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function LoadingModal({ isLoading }) {
  // const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <Button title="Press Me" onPress={() => setIsModalVisible(true)} /> */}
      <Modal visible={isLoading} animationType="fade" transparent={true}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {/* <Button
            title="Close Me"
            onPress={() => setIsModalVisible(false)}
          ></Button> */}
          <View
            style={{
              width: wp("60%"),
              height: wp("40%"),
              backgroundColor: "#e6af2e",

              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              borderColor: "#000080",
              borderWidth: 10,
              // padding: 20,
            }}
          >
            <ActivityIndicator size={60} color="#000080" />
            <Text
              style={{ fontSize: 20, textAlign: "center", color: "#000080" }}
            >
              Loading...
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
