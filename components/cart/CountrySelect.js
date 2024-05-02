import { useStoreContext } from "../../globalstore/Store";
import { useMemo } from "react";
import { View } from "react-native";
import DropdownComponent from "../DropdownComponent";
const CountrySelect = ({ countryCode, setCountryCode }) => {
  const { state } = useStoreContext();
  const region = state.cart.region;
  // console.log(region);
  console.log(state.cart.completed_at, "----completed_at from conuntry select");
  const countryOptions = useMemo(() => {
    if (!region) {
      return [];
    } else if (state.cart?.completed_at) {
      return [];
    } else {
      return region.countries.map((country) => ({
        value: country?.iso_2 ?? "",
        label: country?.display_name ?? "",
      }));
    }
  }, [region]);

  return (
    <View>
      <DropdownComponent
        data={countryOptions}
        value={countryCode}
        setValue={setCountryCode}
        placeholder="Select Country*"
        bgColor="white"
        textColor="#b9b9b9"
        itemTextColor="black"
        showValue={true}
      />
    </View>
  );
};
export default CountrySelect;
