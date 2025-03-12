import React, { useContext, useState, useRef, useEffect } from "react";
import { DetailsContext } from "../context/DetailsContext";
import { assets } from "../assets/assets";
import ProductItem from "../components/ProductItem";
import { useParams } from "react-router-dom";
import Seach from '../components/Seach'
import Navbar from "../components/Navbar";
import Newsletterbox from "../components/Newsletterbox";
import Footer from "../components/Footer";

const Collection = () => {
  const { products, search, setSearch } = useContext(DetailsContext)
  const [filterValues, setFilterValues] = useState([])
  const checkboxRefs = useRef({})
  const [sortOption, setSortOption] = useState()

  const [showCollection, setshowCollection] = useState([])
  let filteredProducts = products
      useEffect(() => {
          if(filterValues.length === 0){
            setshowCollection(products)
          } else{
            filteredProducts = products.filter(product => {
              let matchesPrice = true;
              let matchesCategory = true;
              filterValues.forEach(filter => {
                if (filter.includes("₹")) {
                  const [min, max] = filter.replace("₹ ", "").split("-").map(Number)
                  matchesPrice =  product.price >= min && product.price <= max
                }
                else {
                  matchesCategory = product.subCategory === filter
                }
              })
              return matchesCategory && matchesPrice
            })
          }
          setshowCollection(filteredProducts)
      }, [filterValues, products, sortOption])

      useEffect(() => {
        const filtered = products.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        );
        setshowCollection(filtered);
      }, [search, products]);

    const sortProduct = () => {
      let fpcopy = filteredProducts.slice()
      switch(sortOption){
        case 'low-high':
          setshowCollection(fpcopy.sort((a,b)=>(a.price-b.price)))
          break
        case 'high-low':
          setshowCollection(fpcopy.sort((a,b)=>(b.price-a.price)))
          break
      }
    } 
    useEffect(() =>{
      sortProduct()
    }, [sortOption])

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setFilterValues([...filterValues, value]);
    } else {
      setFilterValues(filterValues.filter((item) => item !== value));
    }
  }

  const handleRemoveFilter = (value) => {
    setFilterValues(filterValues.filter((item) => item !== value));
    if (checkboxRefs.current[value]) {
      checkboxRefs.current[value].checked = false;
    }
  };

  const handleClearAll = () => {
    setFilterValues([]);
    Object.keys(checkboxRefs.current).forEach((key) => {
      checkboxRefs.current[key].checked = false;
    });
  };
  return (
    <div>
      <Navbar />
      <Seach />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw] bg-gray-50 py-10">
      <div className="flex flex-row items-center justify-end gap-2">
        <p className="font-semibold text-sm">Sort by:</p>
        <select className="border border-gray-300 rounded-md outline-none text-sm px-2" onChange={(e) => setSortOption(e.target.value)}>
          <option value="relevent">Relevent</option>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
      </div>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-8 pt-10 border-t">
        <div className="min-w-56 max-w-56">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-2 my-2">
              <p className="text-xl font-semibold">FILTER</p>
              <p
                className="text-sm text-orange-500 font-normal underline underline-offset-2 cursor-pointer"
                onClick={handleClearAll}
              >
                Clear all
              </p>
            </div>
            <p className="w-full h-[0.5px] bg-gray-600"></p>
            <div className="flex flex-col gap-2">
              <p className="text-base font-semibold">PRICE</p>
              {["₹ 50-150", "₹ 150-250", "₹ 250-350"].map((price) => (
                <div key={price} className="flex flex-row items-center gap-2">
                  <input
                    type="checkbox"
                    value={price}
                    className="w-5 h-5 custom-checkbox"
                    onChange={handleCheckboxChange}
                    ref={(el) => (checkboxRefs.current[price] = el)}
                  />
                  <label>{price}</label>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base font-semibold">CATEGORIES</p>
              {["Topwear", "Bottomwear", "Winterwear"].map((category) => (
                <div
                  key={category}
                  className="flex flex-row items-center gap-2"
                >
                  <input
                    type="checkbox"
                    value={category}
                    className="w-5 h-5 custom-checkbox"
                    onChange={handleCheckboxChange}
                    ref={(el) => (checkboxRefs.current[category] = el)}
                  />
                  <label>{category}</label>
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-2 flex-wrap items-start">
              {filterValues.length > 0 &&
                filterValues.map((value, index) => (
                  <div
                    key={index}
                    className="border border-gray-600 rounded-md cursor-pointer flex flex-row gap-1 items-center p-1"
                  >
                    <p className="text-sm font-normal text-center">{value}</p>
                    <img
                      src={assets.close}
                      className="w-3 h-3 mt-1"
                      alt=""
                      onClick={() => handleRemoveFilter(value)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            showCollection.map((item,index) => (
              <ProductItem key={index} name={item.name} id={item._id} image={item.image} price={item.price} />
            ))
        }
      </div>
      </div>
    </div>
    <Newsletterbox />
    <Footer />
    </div>
    
  );
};

export default Collection;
