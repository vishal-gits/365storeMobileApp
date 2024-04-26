import { View, Text, StyleSheet, Modal } from "react-native";

export default function LoadingModal(modalVisible) {
  return (
    <Modal transparent={true} visible={modalVisible}>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontSize: 30 }}>🌀 Loading...</Text>
      </View>
    </Modal>
  );
}
