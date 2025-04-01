import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailsContext } from "../context/DetailsContext";
import { assets, products } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";
import Navbar from "../components/Navbar";
import Newsletterbox from "../components/Newsletterbox";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart,updateCartItemQuantity,token,navigate } = useContext(DetailsContext);
  const [productsData, setProductsData] = useState(false);
  const [img, setImg] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);

  const fetchData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductsData(item);
        setImg(item.image[0]);
        return null;
      }
    });
  };
  useEffect(() => {
    fetchData();
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    if(token){
      addToCart(productsData._id, size);
      setQuantity(1)
    }else{
      toast.error("Please login to continue")
      navigate('/login')
    }
  }
  const handleBuyNow = () => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    if(token){
      addToCart(productsData._id, size);
      setQuantity(1)
      navigate('/placeorder')
    }else{
      toast.error("Please login to continue")
      navigate('/login')
    }

  }
  const handleIncreaseQuantity = () => {
    addToCart(productsData._id, size);
    setQuantity(quantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateCartItemQuantity(productsData._id, size, quantity - 1);
      setQuantity(quantity - 1);
      console.log(quantity);
    } else {
      updateCartItemQuantity(productsData._id, size, 0);
      setQuantity(0);
    }
  };

  return productsData ? (
    <div>
      <Navbar />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw] flex flex-col gap-6">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row pt-6">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto justify-evenly sm:justify-normal sm:w-[18%] w-full sm:gap-2">
            {productsData.image.map((item, index) => (
              <img
                onClick={() => setImg(item)}
                key={index}
                src={item}
                alt=""
                className="border w-[24%] sm:w-full sm:mb-3 object-contain flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={img} alt="" className="w-full h-auto" />
          </div>
        </div>
        <div className="flex-1 ">
          <h1 className="font-medium text-2xl sm:mt-3">{productsData.name}</h1>
          <div className="flex items-center gap-1 mt-3">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />{" "}
            <p className="pl-2">(54)</p>
          </div>
          <p className="font-medium text-xl mt-3">
            {currency}
            {productsData.price}
          </p>
          <p className="text-gray-600 mt-2 md:w-4/5">
            {productsData.description}
          </p>
          <div className="flex flex-col gap-4 my-6">
            <p>Select-Sizes</p>
            <div className="flex gap-2">
              {productsData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border border-gray-300 px-4 py-2 cursor-pointer ${
                    item === size ? "border-blue-900" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
          {quantity > 0 ? (
                <div className="flex items-center gap-2 border border-blue-600 bg-white font-medium px-4 py-2 text-sm">
                  <button onClick={handleDecreaseQuantity} className=" text-blue-600 font-medium px-2 text-base">
                    -
                  </button>
                  <span className="font-medium px-2">{quantity}</span>
                  <button onClick={handleIncreaseQuantity} className=" text-blue-600 font-medium  px-2 text-base">
                    +
                  </button>
                </div>
              ) : (
                <button onClick={handleAddToCart} className="border border-blue-600 text-blue-600 font-medium px-6 py-3 text-sm">
                  ADD TO CART
                </button>
              )}
            <button onClick={handleBuyNow} className="bg-blue-600 text-black px-6 py-3 text-sm">
              BUY NOW
            </button>
          </div>
          <hr className="mt-6 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on Delivery available on this product</p>
            <p>Easy return</p>
          </div>
        </div>
      </div>
      <hr className="mt-5 sm:w-full" />
      <div className="flex flex-col sm:flex-row gap-20 my-5"> 
      <div className="flex flex-col gap-4 sm:min-w-60 ">
          <h2 className="text-xl font-semibold">Customer Ratings</h2>
          <div className="flex items-center gap-2">
            <img src={assets.star_dull_icon} alt="" className="w-4" />
            <img src={assets.star_dull_icon} alt="" className="w-4" />
            <img src={assets.star_dull_icon} alt="" className="w-4" />
            <img src={assets.star_dull_icon} alt="" className="w-4" />
            <img src={assets.star_dull_icon} alt="" className="w-4" />
          </div>
          <p className="text-sm text-gray-500">0 Customer Ratings</p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <p className="min-w-12">5 Stars</p>
              <div className="w-full bg-gray-200 h-2 rounded">
                <div className="bg-blue-600 h-2 rounded" style={{ width: "0%" }}></div>
              </div>
              <p>0%</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="min-w-12">4 Stars</p>
              <div className="w-full bg-gray-200 h-2 rounded">
                <div className="bg-blue-600 h-2 rounded" style={{ width: "0%" }}></div>
              </div>
              <p>0%</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="min-w-12">3 Stars</p>
              <div className="w-full bg-gray-200 h-2 rounded">
                <div className="bg-blue-600 h-2 rounded" style={{ width: "0%" }}></div>
              </div>
              <p>0%</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="min-w-12">2 Stars</p>
              <div className="w-full bg-gray-200 h-2 rounded">
                <div className="bg-blue-600 h-2 rounded" style={{ width: "0%" }}></div>
              </div>
              <p>0%</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="min-w-12">1 Stars</p>
              <div className="w-full bg-gray-200 h-2 rounded">
                <div className="bg-blue-600 h-2 rounded" style={{ width: "0%" }}></div>
              </div>
              <p>0%</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 w-full">
          <h2 className="text-xl font-semibold">No Reviews</h2>
          <div className="flex flex-col items-center gap-4">
          <p>Be the first to review this product</p>
          <button className="bg-blue-600 text-white px-6 py-3 text-sm">
            Write a Review
          </button>
          </div>
        </div>
      </div>
      <RelatedProduct category={productsData.category} subCategory={productsData.subCategory} />
    </div>
    <Newsletterbox />
    <Footer />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
