// for refreshing payment session , when any payment intent is not completed, then it does not allow to update the cart. so you have to cancel the payment intent from stripe and then refresh the payment session  and then run it using node filenamepath

import Medusa from "@medusajs/medusa-js";

const medusa = new Medusa({
  baseUrl: "http://192.168.1.10:9000",
  maxRetries: 3,
});
medusa.carts
  .refreshPaymentSession("cart_01HV6KNEX8E0HK6FCN86KFX66P", "stripe")
  .then(({ cart }) => {
    {
      console.log(cart.id);
    }
  });
