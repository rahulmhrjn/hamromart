import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";

const AdminAllOrders = () => {
  const dispatch = useDispatch();
  const { adminOrders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.6 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.4,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      type: "text",
      minWidth: 100,
      flex: 0.4,
    },
  ];

  const row = [];

  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        status: item.status,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: "Rs." + item.totalPrice,
        createdAt: item?.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Orders</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAllOrders;
