import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "../Layout/Loader";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { BiEditAlt } from "react-icons/bi";

const AllRefundOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const refundOrders =
    orders &&
    orders.filter(
      (item) =>
        item.status === "Processing Refund" || item.status == "Refund Success"
    );

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.8 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.8,
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
      flex: 0.6,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },

    {
      field: "Update",
      flex: 0.6,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <BiEditAlt size={25} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  refundOrders &&
    refundOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "Rs." + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full flex justify-center pt-5">
          <div className="w-[97%]">
            <h3 className="text-[22px] font-Poppins pb-2">
              All Orders Refunded
            </h3>
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
      )}
    </>
  );
};

export default AllRefundOrders;
