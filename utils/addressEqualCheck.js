export const equalAddr = (shippingAddress, billingAddress) => {
  if (
    shippingAddress.first_name === billingAddress.first_name &&
    shippingAddress.last_name === billingAddress.last_name &&
    shippingAddress.address_1 === billingAddress.address_1 &&
    shippingAddress.address_2 === billingAddress.address_2 &&
    shippingAddress.city === billingAddress.city &&
    shippingAddress.country_code === billingAddress.country_code &&
    shippingAddress.state === billingAddress.state &&
    shippingAddress.postal_code === billingAddress.postal_code &&
    shippingAddress.phone === billingAddress.phone &&
    shippingAddress.company === billingAddress.company
  ) {
    return true;
  }
};
