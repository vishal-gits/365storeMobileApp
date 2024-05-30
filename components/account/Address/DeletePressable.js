import { View, Pressable, Modal } from "react-native";
import { Entypo } from "@expo/vector-icons";
import AddressDeleteModal from "./AddressDeleteModal";

const DeletePressable = ({
  setIsModalVisible,
  isModalVisible,
  shippingAddress,
}) => {
  return (
    <View>
      <Pressable
        onPress={() => {
          setIsModalVisible(true);
        }}
      >
        <Modal
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
          transparent={true}
        >
          <AddressDeleteModal {...{ setIsModalVisible, shippingAddress }} />
        </Modal>
        <Entypo name="cross" size={24} color="#000080" />
      </Pressable>
    </View>
  );
};

export default DeletePressable;
