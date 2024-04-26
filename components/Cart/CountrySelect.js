import { useStoreContext } from "../../globalstore/Store";
import { useMemo } from "react";
import { View } from "react-native";
import DropdownComponent from "../DropdownComponent";
const CountrySelect = ({ countryCode, setCountryCode }) => {
  const { state } = useStoreContext();
  const region = state.cart.region;
  // console.log(region);

  const countryOptions = useMemo(() => {
    if (!region) {
      return [];
    }

    return region.countries.map((country) => ({
      value: country.iso_2,
      label: country.display_name,
    }));
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
      />
    </View>
  );
};
export default CountrySelect;
