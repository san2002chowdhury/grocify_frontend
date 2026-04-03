import React, { useState } from "react";
import CartDetails from "../component/CartDetails";
import CartOrderSummery from "../component/CartOrderSummery";
import { useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state?.cart?.cart);
  console.log(cart);

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-full w-full px-2 mx-auto gap-10 items-start">
      <CartDetails cart={cart} />
      <CartOrderSummery cart={cart} />
    </div>
  );
};

export default Cart;
