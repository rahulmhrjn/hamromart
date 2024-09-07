import React from "react";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";
import { useSelector } from "react-redux";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/" className="text-[40px] font-[600] text-[#3321c8]">
          HamroCart
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <h5 className="pr-4 text-[22px] text-[#3321c8]">Admin</h5>
          <img
            src={`${backend_url}${user?.avatar}`}
            alt=""
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
