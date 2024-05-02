import Medusa from "@medusajs/medusa-js";

const medusa = new Medusa({
  baseUrl: "http://192.168.1.10:9000",
  maxRetries: 3,
});

// This could be in a React useEffect hook or an event handler
medusa.carts
  .deletePaymentSession(cart_01HV6KNEX8E0HK6FCN86KFX66P, "stripe")
  .then(({ cart }) => {
    console.log(cart.id);
    // Update your frontend state here
  })
  .catch((error) => {
    console.error("Failed to delete payment session:", error);
  });
