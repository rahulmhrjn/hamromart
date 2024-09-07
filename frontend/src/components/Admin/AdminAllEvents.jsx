import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { server } from "../../server";
import { useSelector } from "react-redux";
import Loader from "../Layout/Loader";
import { MdOutlinePreview } from "react-icons/md";

const AdminAllEvents = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/event/admin-all-events`, { withCredentials: true })
      .then((res) => {
        setEvents(res.data.events);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.5,
    },
    {
      field: "Preview",
      flex: 0.5,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}?isEvent=true`}>
              <Button>
                <MdOutlinePreview size={25} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  events &&
    events.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "Rs. " + item.discountPrice,
        stock: item.stock,
        sold: item.sold_out,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full flex justify-center pt-5">
          <div className="w-[97%]">
            <h3 className="text-[22px] font-Poppins pb-2">All Events</h3>
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

export default AdminAllEvents;
