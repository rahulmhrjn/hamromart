import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import { server } from "../../server";
import axios from "axios";
import { MdOutlinePreview } from "react-icons/md";

const AdminAllProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/product/admin-all-products`, { withCredentials: true })
      .then((res) => {
        setData(res.data.products);
      });
  }, []);

  const columns = [
    { field: "id", headerName: " Product ID", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.6,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.4,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.4,
    },
    {
      field: "sold",
      headerName: "Sold Out",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "Preview",
      flex: 0.4,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
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

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "Rs." + item.discountPrice,
        stock: item.stock,
        sold: item.sold_out,
      });
    });

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Products</h3>
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

export default AdminAllProducts;
