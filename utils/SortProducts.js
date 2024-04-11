const sortProducts = (products, value) => {
  if (value === "price_asc") {
    // console.log("p1");
    return products.sort((a, b) => {
      if (!a.variants[0].prices[1].amount || !b.variants[0].prices[1].amount)
        return 0;

      return a.variants[0].prices[1].amount - b.variants[0].prices[1].amount;
    });
  }

  if (value === "price_desc") {
    // console.log("p2");
    return products.sort((a, b) => {
      if (!a.variants[0].prices[1].amount || !b.variants[0].prices[1].amount)
        return 0;

      return b.variants[0].prices[1].amount - a.variants[0].prices[1].amount;
    });
  }

  if (value === "created_at") {
    // console.log("p3");
    return products.sort((a, b) => {
      if (!a.created_at || !b.created_at) return 0;

      return (
        new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
      );
    });
  }
  // console.log(products, "from sort products");
  return products;
};

export default sortProducts;
