import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";

export const DetailsContext = createContext();

const ContextProvider = (props) => {
    const currency = '₹'
    const deliveryCharge = 65
    const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"
    const [search, setSearch] = useState('')
    const [showSearch,setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [token,setToken] = useState('')
    const [products, setProducts] = useState([])
    const [userInitial,setUserInitial] = useState('')
    const navigate = useNavigate()

    const addToCart = async (itemId,size) => {
        let cartData = structuredClone(cartItems)
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }
        }
        else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)
        console.log(cartData)
        if(token){
          try {
            await axios.post(backendURL+"/api/cart/add",{itemId,size},{headers:{token}})
            console.log('haha')
          } catch (error) {
            console.log(error)
        toast.error(error.message)
          }
        }
    }
    const getCartCount = () => {
        let totalItems = 0
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalItems += cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalItems
    }

    const updateCartItemQuantity = async (itemId, size, quantity) => {
        setCartItems((prevCartItems) => {
          const updatedCartItems = { ...prevCartItems };
          if (quantity > 0) {
            updatedCartItems[itemId] = {
              ...updatedCartItems[itemId],
              [size]: quantity,
            };
          } else {
            delete updatedCartItems[itemId][size];
            if (Object.keys(updatedCartItems[itemId]).length === 0) {
              delete updatedCartItems[itemId];
            }
          }
          return updatedCartItems;
        })
        if(token){
          try {
            console.log("upppppp")
            await axios.post(backendURL+"/api/cart/update",{itemId, size, quantity},{headers:{token}})
          } catch (error) {
            console.log(error)
        toast.error(error.message)
          }
        }
      }

      const removeCartItem = (productId, size) => {
        setCartItems((prevCartItems) => {
          const updatedCartItems = { ...prevCartItems };
          delete updatedCartItems[productId][size];
          if (Object.keys(updatedCartItems[productId]).length === 0) {
            delete updatedCartItems[productId];
          }
          return updatedCartItems;
        })
      }
      const getCartAmount = () => {
        let total = 0
        for(const items in cartItems){
          let product = products.find((product) => product._id === items);
            for(const size in cartItems[items]){
                try {
                  if(cartItems[items][size]>0){
                      total += product.price * cartItems[items][size]
                  }
                  
                } catch (error) {
                  
                }
            }
        }
        return total 
    }
    const getProductData = async () => {
      try {
        const res = await axios.get(backendURL + '/api/product/list')
        console.log(res.data) 
        if(res.data.success){
          setProducts(res.data.products)
        }else{
          toast.error(res.data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
    const getUserCart = async (token) => {
      try {
          const res = await axios.post(backendURL + "/api/cart/get", {}, { headers: { token } });
  
          if (res.data.success) {
              let cleanedCartData = {};
  
              // Remove products with empty sizes
              Object.keys(res.data.cartData).forEach((itemId) => {
                  if (Object.keys(res.data.cartData[itemId]).length > 0) {
                      cleanedCartData[itemId] = res.data.cartData[itemId];
                  }
              });
  
              setCartItems(cleanedCartData);
          }
      } catch (error) {
          console.log(error);
          toast.error(error.message);
      }
  };
  
    useEffect(() => {
      getProductData()
    },[])

    useEffect(() => {
      if(!token && (localStorage.getItem('token'))){
        setToken(localStorage.getItem('token'))
        getUserCart(localStorage.getItem('token'))
      }
    },[])

    useState(() => {
        console.log(cartItems)
    }, [cartItems])


    const value = {
        products, currency, deliveryCharge,search,navigate,setSearch,showSearch,setShowSearch,cartItems,addToCart,getCartCount,updateCartItemQuantity,getCartAmount,removeCartItem,backendURL,token,setToken,userInitial,setUserInitial,setCartItems
    }
    return (
        <DetailsContext.Provider value={value}>
            {props.children}
        </DetailsContext.Provider>
    )
}

export default ContextProvider