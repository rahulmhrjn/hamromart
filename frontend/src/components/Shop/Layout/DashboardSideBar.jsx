import React from "react";
import {
  AiOutlineFolderAdd,
  AiOutlineGift,
  AiOutlineSetting,
  AiOutlineShopping,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { VscNewFile } from "react-icons/vsc";
import { GiReceiveMoney } from "react-icons/gi";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSideBar = ({ active }) => {
  return (
    <div className="w-full h-[100vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-2.5">
        <Link to="/dashboard" className="w-full flex items-center">
          <LuLayoutDashboard
            size={30}
            color={`${active === 1 ? "#3321c8" : "#555"}`}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[#3321c8]" : "text-[#555]"
            }`}
          >
            Seller Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-2.5">
        <Link
          to="/dashboard-create-product"
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
            size={30}
            color={`${active === 2 ? "#3321c8" : "#555"}`}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[#3321c8]" : "text-[#555]"
            }`}
          >
            Add Product
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-2.5">
        <Link to="/dashboard-products" className="w-full flex items-center">
          <AiOutlineShopping
            size={30}
            color={`${active === 3 ? "#3321c8" : "#555"}`}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[#3321c8]" : "text-[#555]"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-2.5">
        <Link to="/dashboard-create-event" className="w-full flex items-center">
          <VscNewFile
            size={30}
            color={`${active === 4 ? "#3321c8" : "#555"}`}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[#3321c8]" : "text-[#555]"
            }`}
          >
            Add Event
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-2.5">
        <Link to="/dashboard-events" className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={30}
            color={`${active === 5 ? "#3321c8" : "#555"}`}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[#3321c8]" : "text-[#555]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-2.5">
        <Link to="/dashboard-coupons" className="w-full flex items-center">
          <AiOutlineGift
            size={30}
            color={`${active === 6 ? "#3321c8" : "#555"}`}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[#3321c8]" : "text-[#555]"
            }`}
          >
            Coupon Codes
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-2.5">
        <Link to="/dashboard-orders" className="w-full flex items-center">
          <AiOutlineShoppingCart
            size={30}
            color={`${active === 7 ? "#3321c8" : "#555"}`}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 7 ? "text-[#3321c8]" : "text-[#555]"
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-2.5">
        <Link to="/dashboard-refunds" className="w-full flex items-center">
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 8 ? "#3321c8" : "#555"}`}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[#3321c8]" : "text-[#555]"
            }`}
          >
            Refunds
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-2.5">
        <Link
          to="/dashboard-withdraw-money"
          className="w-full flex items-center"
        >
          <GiReceiveMoney
            size={30}
            color={`${active === 9 ? "#3321c8" : "#555"}`}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 9 ? "text-[#3321c8]" : "text-[#555]"
            }`}
          >
            Withdraw Money
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-2.5">
        <Link to="/dashboard-messages" className="w-full flex items-center">
          <BiMessageSquareDetail
            size={30}
            color={`${active === 10 ? "#3321c8" : "#555"}`}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 10 ? "text-[#3321c8]" : "text-[#555]"
            }`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-2.5">
        <Link to="/settings" className="w-full flex items-center">
          <AiOutlineSetting
            size={30}
            color={`${active === 11 ? "#3321c8" : "#555"}`}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 11 ? "text-[#3321c8]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSideBar;
