import React, { useContext, useEffect, useState } from "react";
import { DetailsContext } from "../context/DetailsContext";
import EmptyCart from "../components/EmptyCart";
import CartNav from "../components/CartNav";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    getCartCount,
    updateCartItemQuantity,
  } = useContext(DetailsContext);

  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const tempData = [];
    let total = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        const product = products.find((product) => product._id === item);
        const quantity = cartItems[item][size];
        const price = product.price * quantity;
        total += price;
        tempData.push({
          _id: product._id,
          name: product.name,
          size: size,
          price: product.price,
          quantity: quantity,
          image: product.image[0],
          totalPrice: price,
        });
      }
    }
    setTotalPrice(total);
    setCartData(tempData);
  }, [cartItems]);

  const handleRemoveItem = (productId, size) => () => {
    updateCartItemQuantity(productId, size);
  };
  if (getCartCount() === 0) {
    return <EmptyCart />;
  }

  const handleQuantityChange = (productId, size, newQuantity) => {
    updateCartItemQuantity(productId, size, newQuantity);
    setCartData((prevCartData) =>
      prevCartData.map((item) =>
        item._id === productId && item.size === size
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: item.price * newQuantity,
            }
          : item
      )
    );
    const updatedTotalPrice = cartData.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    setTotalPrice(updatedTotalPrice);
  };

  return (
    <div>
      <CartNav />
      <div className="px-4 sm:px-[5vw] md:px-[8vw] lg:px-[12vw] my-5 sm:my-10">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col gap-4 w-full sm:min-w-[50vw]">
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-md sm:text-xl font-medium sm:mb-2 hidden sm:block">
                Shopping Cart ({getCartCount()} Items)
              </h1>
              <p className="text-md sm:text-xl font-medium sm:mb-2 hidden sm:block">
                Total {currency} {totalPrice}
              </p>
              <p className="block sm:hidden text-sm font-light">{getCartCount()} ITEM</p>
              <p className="block sm:hidden text-base font-semibold">Total {currency}{totalPrice}</p>
            </div>
            <div>
              {cartData.map((item, index) => (
                <div className="flex flex-col sm:flex-row justify-between sm:p-4 sm:border rounded-md sm:my-2">
                  <div key={index} className="flex gap-5">
                    <div className="py-2 overflow-hidden">
                      <img src={item.image} alt="" className="w-36 sm:w-28" />
                    </div>
                    <div className="flex flex-col sm:my-2 gap-2">
                      <h2 className="font-normal font-sans text-gray-800">
                        {item.name}
                      </h2>
                      <p className="text-md font-semibold">
                        {currency}
                        {item.price}
                      </p>
                      <p className="text-sm">Size: {item.size}</p>
                      <div className="text-sm">
                        <label htmlFor={`quantity-${index}`} className="mr-2">
                          Qty:
                        </label>
                        <select
                          id={`quantity-${index}`}
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item._id,
                              item.size,
                              parseInt(e.target.value)
                            )
                          }
                          className="border rounded px-2 py-1"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((qty) => (
                            <option key={qty} value={qty}>
                              {qty}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr className="opacity-100 sm:opacity-0 mt-4" />
                  <p
                    className="text-gray-600 pr-5 text-center sm:text-start cursor-pointer"
                    onClick={handleRemoveItem(item._id, item.size)}
                  >
                    Remove
                  </p>
                </div>
              ))}
            </div>
          </div>
          <CartTotal />
        </div>
      </div>
    </div>
  );
};

export default Cart;
