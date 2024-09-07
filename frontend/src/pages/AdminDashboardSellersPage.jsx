import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminAllSellers from "../components/Admin/AdminAllSellers";

const AdminDashboardSellersPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={3} />
          </div>
          <AdminAllSellers />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSellersPage;
