import { View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

const EditPressable = ({
  setIsAddEditing,
  shippingAddress,
  setAddressForEdit,
}) => {
  return (
    <View>
      <Pressable
        onPress={() => {
          setAddressForEdit(shippingAddress);
          setIsAddEditing(true);
        }}
      >
        <Feather name="edit" size={24} color="#000080" />
      </Pressable>
    </View>
  );
};

export default EditPressable;
