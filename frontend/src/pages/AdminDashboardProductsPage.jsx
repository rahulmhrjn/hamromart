import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminAllProducts from "../components/Admin/AdminAllProducts";

const AdminDashboardProductsPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={5} />
          </div>
          <AdminAllProducts />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardProductsPage;
