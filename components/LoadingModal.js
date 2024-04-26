import { View, Text, StyleSheet, Modal } from "react-native";

export default function LoadingModal(isAddingCart) {
  return (
    <Modal transparent={true} visible={isAddingCart}>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "white",
          width: "50%",
          height: "50%",
        }}
      >
        <Text style={{ fontSize: 30 }}>🌀 Loading...</Text>
      </View>
    </Modal>
  );
}
