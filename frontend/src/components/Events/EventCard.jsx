import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown.jsx";
import { backend_url } from "../../server";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Product is already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Can't add more than available stocks!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Product added to cart successfully!");
      }
    }
  };

  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
<div className="w-full lg:w-[50%] m-auto">
  {data && data.images && data.images.length > 0 ? (
    // Assuming the correct property name is 'images'
    <img src={`${backend_url}${data.images[0]}`} alt="" />
  ) : (
    console.error('Invalid data structure or no images available.')
  )}
</div>
      <div className="w-full flex flex-col justify-center m-20">
        {data && data.name ? (
          <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        ) : (
          <p className="text-red-500">Currently events or products are not available</p>
        )}
        <div className="flex py-2 justify-between">
        <div className="flex">
  {data && data.originalPrice && (
    <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
      Rs.{data.originalPrice}
    </h5>
  )}
  {data && data.discountPrice && (
    <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
      Rs.{data.discountPrice}
    </h5>
  )}
</div>
<span className="pr-3 font-400 text-[17px] text-[#3321c8]">
  Stocks: {data && data.stock ? data.stock : 'N/A'}
</span>
<span className="pr-3 font-400 text-[17px] text-[#3321c8]">
  Sold: {data && data.sold_out ? data.sold_out : 'N/A'}
</span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
        {data && data._id && (
  <Link to={`/product/${data._id}?isEvent=true`}>
    <div className={`${styles.button} text-[#fff] rounded`}>
      See Details
    </div>
  </Link>
)}
          <div
            className={`${styles.button} text-[#fff] ml-5 !rounded`}
            onClick={() => addToCartHandler(data)}
          >
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
