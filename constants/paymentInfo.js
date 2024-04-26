import { AntDesign } from "@expo/vector-icons";

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */

export const paymentInfoMap = {
  stripe: {
    title: "Credit card",
    icon: <AntDesign name="creditcard" size={24} color="black" />,
  },

  manual: {
    title: "Test payment",
    icon: <AntDesign name="creditcard" size={24} color="black" />,
  },
  // Add more payment providers here
};
